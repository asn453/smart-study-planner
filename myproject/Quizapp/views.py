from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from ai_features.services import generate_quiz
from .models import QuizModel
from .serializers import QuizSerializers
from rest_framework import status

class Quiz(ModelViewSet):

    serializer_class = QuizSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return QuizModel.objects.filter(
            user=self.request.user
        )

    def perform_create(self,serializer):
        serializer.save(
            user=self.request.user
        )

    @action(detail=False,methods=['post'])
    def generate(self,request):
        topic=request.data.get('topic')
        if not topic:
            raise ValidationError('quiz topic is required')
        
        try:
            quiz=generate_quiz(topic)
            QuizModel.objects.create(user=request.user,topic=topic)
            return Response({'quiz':quiz})

        except Exception as e:
            return Response({'error':'Gemini is busy. Try again later.'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE

        )