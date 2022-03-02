from django.urls import path

from .views import (retrieve_comments,
                    create_comment,
                    delete_comment)

urlpatterns = [
    path('<int:post_id>/get', retrieve_comments),
    path('new', create_comment),
    path('del/<int:comment_id>', delete_comment)
]
