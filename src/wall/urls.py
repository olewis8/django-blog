from django.urls import path

from .views import (wall_view)

urlpatterns = [
    path('', wall_view),
]
