from django.urls import path

from .views import (blog_list_view,
                    blog_detail_view,
                    blog_create_view,)

urlpatterns = [
    path('', blog_list_view),
    path('<int:post_id>/', blog_detail_view),
    path('new/', blog_create_view)
]
