#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Install all dependencies from requirements.txt
pip install -r requirements.txt

# 2. Collect static files (CSS, JS, Images) for production
python manage.py collectstatic --no-input

# 3. Run database migrations against your Neon database
python manage.py migrate