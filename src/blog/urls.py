from django.urls import path

from .views import (home_page,
                    discover_page,
                    post_detail_page,
                    create_post_page,
                    update_post_page,
                    delete_post_page,
                    search_results_page,

                    excecute_query,
                    toggle_like,
                    retrieve_posts,
                    retrieve_blog_detail,
                    retrieve_user_posts)

urlpatterns = [
    path('', home_page, name='blog'),
    path('discover/', discover_page),
    path('results/', search_results_page),
    path('<int:post_id>/', post_detail_page),
    path('<int:post_id>/edit/', update_post_page),
    path('<int:post_id>/delete/', delete_post_page),
    path('new/', create_post_page),

    path('<str:page>/get-posts', retrieve_posts),
    path('<int:post_id>/get/', retrieve_blog_detail),
    path('<int:post_id>/like', toggle_like.as_view(), name='toggle_like'),
    path('<str:username>/get-user-posts', retrieve_user_posts),
    path('search/<str:query>', excecute_query),
]
