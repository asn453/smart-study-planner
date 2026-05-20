from rest_framework.routers import DefaultRouter
from .views import PdfManager

router = DefaultRouter()
router.register(r'pdf',PdfManager,basename='pdf')

urlpatterns = router.urls