from django.urls import path

from .views import (comment_page)

urlpatterns = [
    path('<int:post_id>/', comment_page),
]
