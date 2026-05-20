from django.shortcuts import render
from .models import StudyPlannerModel
from .serializers import studyplannerserializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
# Create your views here.

class StudyPlanner(ModelViewSet):
    serializer_class = studyplannerserializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StudyPlannerModel.objects.filter(user = self.request.user)

    def perform_create(self,serializer):
        serializer.save(user = self.request.user)

    def create(self, request , *args , **kwargs):
        if not request.data.get('subject') or not request.data.get('topic'):
            raise ValidationError('subject or topic must be provided')
        return super().create(request,*args,**kwargs)
