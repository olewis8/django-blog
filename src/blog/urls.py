from django.urls import path

from .views import (blog_list_view,
                    blog_detail_view,
                    blog_create_view,
                    blog_edit_view,
                    blog_delete_view)

urlpatterns = [
    path('', blog_list_view),
    path('<int:post_id>/', blog_detail_view),
    path('<int:post_id>/edit/', blog_edit_view),
    path('<int:post_id>/delete/', blog_delete_view),
    path('new/', blog_create_view)
]
