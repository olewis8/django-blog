from django.shortcuts import render


def home_view(request):
    template_name = 'pages/home.html'
    context = {'title': 'home',
               }

    return render(request, template_name, context)


def about_view(request):
    template_name = 'pages/about.html'
    context = {'title': 'about me',
               }

    return render(request, template_name, context)


def contact_view(request):
    template_name = 'pages/contact.html'
    context = {'title': 'contact me',
               }

    return render(request, template_name, context)


def login_view(request):
    template_name = 'pages/login.html'
    context = {'title': 'login',
               }

    return render(request, template_name, context)
