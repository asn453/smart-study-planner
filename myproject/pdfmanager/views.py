# pdfmanager/views.py
import cloudinary.uploader
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .models import PdfManagerModel
from .serializers import pdfSerializers

class PdfManager(ModelViewSet):
    serializer_class = pdfSerializers
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        # Only fetch items uploaded by the logged-in user
        return PdfManagerModel.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        title = request.data.get('title')
        pdf_file = request.FILES.get('pdf')

        if not title or not pdf_file:
            return Response({"error": "Title and PDF file are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 1. Upload to Cloudinary with 'auto' processing
            upload_result = cloudinary.uploader.upload(
                pdf_file,
                resource_type="auto",      # ✨ FIX 1: Keeps the .pdf extension viewable for Chrome
                folder="study_planners"   
            )
            
            # 2. Extract the generated url securely
            cloudinary_url = upload_result.get("secure_url")

            # ✨ FIX 2: Stop silent failures. If the link is missing, force an error path!
            if not cloudinary_url:
                raise Exception("Cloudinary did not return a valid secure URL string.")

            # 3. Save the actual text link inside the database URLField
            pdf_instance = PdfManagerModel.objects.create(
                user=request.user,
                title=title,
                pdf=cloudinary_url
            )

            # 4. Return clean data back to React
            serializer = self.get_serializer(pdf_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            # Check your Render server dashboard log stream to see this message clearly if it breaks!
            print(f"--- CLOUDINARY UPLOAD ERROR: {str(e)} ---")
            return Response({"error": f"File storage upload failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)