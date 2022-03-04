from django.contrib import admin
from django.urls import path, include

from .views import (home_view,)

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),

    path('blog/', include('blog.urls')),
    path('users/', include('users.urls')),
    path('users/', include('django.contrib.auth.urls')),

    path('api/blog/', include('blog.urls')),
    path('api/users/', include('users.urls')),
    path('api/comments/', include('comments.urls'))
]
