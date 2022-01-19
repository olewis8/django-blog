from django.urls import path

from .views import (comment_page, retrieve_comments)

urlpatterns = [
    path('<int:post_id>/', comment_page, name='post_id'),
    path('<int:post_id>/get', retrieve_comments)
]
