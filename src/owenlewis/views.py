from django.shortcuts import render


def home_view(request):
    template_name = 'pages/home.html'
    context = {}

    return render(request, template_name, context)
