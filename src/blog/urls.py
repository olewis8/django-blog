from django.urls import path, include

from .views import (home_page,
                    post_detail_page,
                    create_post_page,
                    update_post_page,
                    delete_post_page,

                    toggle_like,
                    retrieve_posts,
                    retrieve_blog_detail,
                    retrieve_user_posts)

urlpatterns = [
    path('', home_page, name='blog'),
    path('<int:post_id>/', post_detail_page),
    path('<int:post_id>/edit/', update_post_page),
    path('<int:post_id>/delete/', delete_post_page),
    path('new/', create_post_page),

    path('<int:post_id>/c/', include('comments.urls')),

    path('<str:page>/get-posts/', retrieve_posts),  # done
    path('<int:post_id>/get/', retrieve_blog_detail),  # done
    path('<int:post_id>/like/', toggle_like.as_view(), name='toggle_like'),  # done
    path('<str:username>/get-user-posts/', retrieve_user_posts),  # done
]
