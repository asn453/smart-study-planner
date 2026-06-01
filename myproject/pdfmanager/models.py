from django.db import models
from django.contrib.auth.models import User
from cloudinary_storage.storage import RawMediaCloudinaryStorage
# Create your models here.

class PdfManagerModel(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    pdf = models.URLField(max_length=500)
    uploaded_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title