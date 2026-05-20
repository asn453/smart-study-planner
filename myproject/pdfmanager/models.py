from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class PdfManagerModel(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    pdf = models.FileField(upload_to='images/')
    uploaded_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title