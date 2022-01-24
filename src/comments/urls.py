from django.urls import path

from .views import (comment_page,
                    retrieve_comments,
                    create_comment,
                    delete_comment)

urlpatterns = [
    # path('<int:post_id>/', comment_page),
    # path('<int:post_id>/get', retrieve_comments),
    # path('<int:post_id>/new', create_comment),
    # path('<int:post_id>/del/<int:comment_id>', delete_comment),

    path('', comment_page),
    path('get', retrieve_comments),
    path('new', create_comment),
    path('del/<int:comment_id>', delete_comment)
]
