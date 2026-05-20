from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class QuizModel(models.Model):
    user = models.ForeignKey(User , on_delete= models.CASCADE)
    topic = models.CharField(max_length=100)
    score=models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.topic