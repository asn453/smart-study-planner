from django.shortcuts import render
from .models import PdfManagerModel
from .serializers import pdfSerializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
# Create your views here.

class PdfManager(ModelViewSet):
    serializer_class = pdfSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PdfManagerModel.objects.filter(user = self.request.user)
    
    def perform_create(self,serializer):
        serializer.save(user = self.request.user)

    def create(self, request , *args , **kwargs):
        if not request.data.get('title') or not request.FILES.get('pdf'):
            raise ValidationError('name must be provided')
        return super().create(request,*args,**kwargs)