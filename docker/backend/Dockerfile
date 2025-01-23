FROM python:3.9-slim

WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy project
COPY backend /app/backend/

# Install Python dependencies
RUN pip install -r requirements.txt

# migrate
RUN python manage.py makemigrations
RUN python manage.py migrate





CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
