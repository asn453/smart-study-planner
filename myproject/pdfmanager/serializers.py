from rest_framework import serializers
from .models import PdfManagerModel

class pdfSerializers(serializers.ModelSerializer):
    title = serializers.CharField(
        error_messages={"blank": "Hey! You forgot to provide a title for the PDF.", 
                        "required": "Hey! You forgot to provide a title for the PDF."}
    )
    pdf = serializers.FileField(
        error_messages={"blank": "Please upload a valid PDF file.", 
                        "required": "Please upload a valid PDF file."}
    )

    class Meta:
        model = PdfManagerModel
        fields = '__all__' 
        read_only_fields = ['user']