from  rest_framework.routers import DefaultRouter
from .views import Quiz

router = DefaultRouter()
router.register(r'quiz',Quiz,basename='quiz')

urlpatterns = router.urls