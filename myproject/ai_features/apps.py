import os
from django.apps import AppConfig
from django.db.models.signals import post_migrate

def create_admin_account(sender, **kwargs):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    
    # Securely checks for credentials inside your environment variables
    username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
    email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
    password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
    
    # Safely skips if no password environment variable is set
    if not password:
        print("Superuser creation skipped: No password provided in environment variables.")
        return
    
    if not User.objects.filter(username=username).exists():
        print("Creating secure cloud superuser...")
        User.objects.create_superuser(username=username, email=email, password=password)
        print("Superuser created successfully!")

class AiFeaturesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ai_features'

    def ready(self):
        # Triggers our script automatically right after migrations finish
        post_migrate.connect(create_admin_account, sender=self)