from rest_framework import serializers
from .models import PdfManagerModel

class pdfSerializers(serializers.ModelSerializer):
    class Meta:
        model = PdfManagerModel
        fields = '__all__' 
        read_only_fields = ['user']