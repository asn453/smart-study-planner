from django.shortcuts import render
from .models import PdfManagerModel
from .serializers import pdfSerializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser

class PdfManager(ModelViewSet):
    serializer_class = pdfSerializers
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return PdfManagerModel.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)