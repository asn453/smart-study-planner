from django.contrib import admin
from .models import QuizModel
# Register your models here.
class Quizadmin(admin.ModelAdmin):
    list_display = ['user','topic','created_at']
    search_fields = ['user__username','topic']

admin.site.register(QuizModel,Quizadmin)