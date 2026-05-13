from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ActivityModel(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    subject = models.CharField(max_length=200)
    topic = models.CharField(max_length = 200) 
    datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject