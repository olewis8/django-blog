from django.urls import path, include

from .views import (blog_home,
                    blog_detail,
                    blog_create,
                    blog_edit,
                    blog_delete,
                    toggle_like,
                    retrieve_posts,
                    rest_blog_detail,
                    retrieve_user_posts)

urlpatterns = [
    path('', blog_home, name='blog'),
    path('<int:post_id>/c/', include('comments.urls')),
    path('page/<str:page>/get/', retrieve_posts),
    path('<int:post_id>/', blog_detail),
    path('<int:post_id>/get/', rest_blog_detail),
    path('<int:post_id>/edit/', blog_edit),
    path('<int:post_id>/delete/', blog_delete),
    path('<int:post_id>/like/', toggle_like.as_view(), name='toggle_like'),

    path('<str:username>/get/', retrieve_user_posts),
    path('new/', blog_create),
]
