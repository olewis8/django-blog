from django.urls import path

from .views import (follows_page,
                    login_page,
                    logout_page,
                    register_page,
                    profile_page,

                    toggle_follow,
                    refresh_bio_card,
                    retrieve_bio_data,
                    retrieve_user_following,
                    retrieve_user_followers)

urlpatterns = [
    path('login/', login_page, name='login'),
    path('logout/', logout_page),
    path('register/', register_page),
    path('<str:username>/', profile_page),
    path('<str:username>/followers/', follows_page),
    path('<str:username>/following/', follows_page),

    path('<str:username>/follow/', toggle_follow.as_view()),
    path('<str:username>/refresh_bio_card/', refresh_bio_card),
    path('<str:username>/bio-data/', retrieve_bio_data),
    path('<str:username>/retrieve_user_followers/', retrieve_user_followers),
    path('<str:username>/retrieve_user_following/', retrieve_user_following),
]
