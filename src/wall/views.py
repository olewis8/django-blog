from django.shortcuts import render

from .models import WallCard

# Create your views here.


def home_view(request):
    qs = WallCard.objects.all()

    template_name = 'pages/wall_grid.html'
    context = {'qs': qs}

    return render(request, template_name, context)
