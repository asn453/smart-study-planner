from rest_framework.routers import DefaultRouter
from .views import StudyPlanner

router = DefaultRouter()
router.register(r'planner',StudyPlanner,basename='planner')

urlpatterns = router.urls