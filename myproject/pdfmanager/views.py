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
        return PdfManagerModel.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        title = request.data.get('title')
        pdf_file = request.FILES.get('pdf')

        if not title or not pdf_file:
            return Response({"error": "Title and PDF file are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            upload_result = cloudinary.uploader.upload(
                pdf_file,
                resource_type="auto",      # Explicitly flags it as a PDF/document
                folder="study_planners"   # Organizes it inside a folder in your media library
            )
            
            # 3. Extract the live web link Cloudinary generated
            cloudinary_url = upload_result.get("secure_url")

            # 4. Save the record directly to your database linked to the user
            pdf_instance = PdfManagerModel.objects.create(
                user=request.user,
                title=title,
                pdf=cloudinary_url
            )

            # 5. Return the clean data back to React
            serializer = self.get_serializer(pdf_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            # This will print the *exact* error to your Render logs if Cloudinary fails!
            print(f"--- CLOUDINARY UPLOAD ERROR: {str(e)} ---")
            return Response({"error": "File storage upload failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)