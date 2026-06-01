from django.contrib import admin
from .models import PdfManagerModel
# Register your models here.
class Pdfmanageradmin(admin.ModelAdmin):
    list_display= ['user','title','pdf','uploaded_time']
    search_fields = ['user__username','title']