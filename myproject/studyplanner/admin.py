from django.contrib import admin
from .models import StudyPlannerModel
# Register your models here.
class studyadmin(admin.ModelAdmin):
    list_display = ['user','subject','topic','completed','created_at']
    search_fields =['user__username','subject','topic']
    
admin.site.register(StudyPlannerModel,studyadmin)