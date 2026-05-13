from django.db import models
from django.contrib.auth.models import User 
from myapp.models import ActivityModel
# Create your models here.

class DailyActivityModel(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    topic = models.ForeignKey(ActivityModel , on_delete=models.CASCADE)
    add_task = models.ForeignKey(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.add_task
