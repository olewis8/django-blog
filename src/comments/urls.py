from django.urls import path

from .views import (comment_page, retrieve_comments, create_comment)

urlpatterns = [
    path('<int:post_id>/', comment_page),
    path('<int:post_id>/get', retrieve_comments),
    path('<int:post_id>/new', create_comment),
]
