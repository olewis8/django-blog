from django.urls import path

from .views import (blog_home_view,
                    blog_detail_view,
                    blog_discover_view,
                    blog_create_view,
                    blog_edit_view,
                    blog_delete_view,
                    toggle_like,

                    rest_discover_view,
                    rest_home_view)

urlpatterns = [
    path('', blog_home_view, name='blog'),
    path('for-you/', rest_home_view),
    path('discover/', blog_discover_view),
    path('discover-rest/', rest_discover_view),
    path('<int:post_id>/', blog_detail_view),
    path('<int:post_id>/edit/', blog_edit_view),
    path('<int:post_id>/delete/', blog_delete_view),
    path('<int:post_id>/like/', toggle_like.as_view(), name='toggle_like'),
    path('new/', blog_create_view)
]
