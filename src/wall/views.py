from django.shortcuts import render

from .models import WallCard

# Create your views here.


def wall_view(request):
    qs = WallCard.objects.all()

    template_name = 'pages/wall_grid.html'
    context = {'qs': qs}

    return render(request, template_name, context)


def create_view(request):
    template_name = ''
    context = {}

    return render(request, template_name, context)
