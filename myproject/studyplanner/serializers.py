from rest_framework import serializers
from .models import StudyPlannerModel

class studyplannerserializers(serializers.ModelSerializer):
    class Meta:
        model = StudyPlannerModel
        fields = '__all__'
        read_only_fields = ['user']