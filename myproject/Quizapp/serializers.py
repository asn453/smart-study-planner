from rest_framework import serializers
from .models import QuizModel

class QuizSerializers(serializers.ModelSerializer):
    class Meta:
        model = QuizModel
        fields = '__all__'
        read_only_fields = ['user']