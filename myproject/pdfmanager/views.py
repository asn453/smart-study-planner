# pdfmanager/views.py
import cloudinary
import cloudinary.uploader
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

from .models import PdfManagerModel
from .serializers import pdfSerializers

class PdfManager(ModelViewSet):
    serializer_class = pdfSerializers
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return PdfManagerModel.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        title = request.data.get('title')
        pdf_file = request.FILES.get('pdf')

        if not title or not pdf_file:
            return Response({"error": "Title and PDF file are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Explicit credentials configuration
            cloudinary.config(
                cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
                api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
                api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
            )

            # 👇 FIX: Rewind the file pointer to byte 0 
            # This ensures we don't accidentally upload a blank 0-byte file
            pdf_file.seek(0)
            file_bytes = pdf_file.read()
            file_name = pdf_file.name

            # Upload to Cloudinary securely
            upload_result = cloudinary.uploader.upload(
                file_bytes,                 
                public_id=file_name,        
                resource_type="auto",      
                folder="study_planners"   
            )
            
            cloudinary_url = upload_result.get("secure_url")

            if not cloudinary_url:
                raise Exception("Cloudinary upload completed but returned a blank secure URL.")

            # Save the clean link string to your DB
            pdf_instance = PdfManagerModel.objects.create(
                user=request.user,
                title=title,
                pdf=cloudinary_url
            )

            serializer = self.get_serializer(pdf_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(f"!!! CLOUDINARY ENGINE FAILURE: {str(e)} !!!")
            return Response(
                {"error": "File storage upload failed.", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )