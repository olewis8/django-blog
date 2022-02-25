from django.urls import path

from .views import (toggle_follow,
                    followers_view,
                    following_view,
                    login_view,
                    logout_view,
                    register_view,
                    profile_view,

                    retrieve_bio_data)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view),
    path('register/', register_view),
    path('<str:username>/', profile_view),
    path('<str:username>/follow/', toggle_follow.as_view()),
    path('<str:username>/followers/', followers_view),
    path('<str:username>/following/', following_view),

    path('<str:username>/bio-data/', retrieve_bio_data)
]
