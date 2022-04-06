from django.shortcuts import render


def home_view(request):
    template_name = 'pages/home.html'
    return render(request, template_name)


def projects_page(request):
    template_name = 'pages/projects.html'
    return render(request, template_name)
