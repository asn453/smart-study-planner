from rest_framework.generics import CreateAPIView
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny

class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]