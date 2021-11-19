from django.shortcuts import render

from .forms import ContactForm


def home_view(request):
    template_name = 'pages/home.html'
    context = {'title': 'hello world,,,',
               'message': '',
               }

    return render(request, template_name, context)


def about_view(request):
    template_name = 'pages/about.html'
    context = {'title': 'about me',
               }

    return render(request, template_name, context)


def contact_view(request):
    form = ContactForm(request.POST or None)

    template_name = 'form.html'
    context = {'title': 'contact me',
               'form': form,
               }

    return render(request, template_name, context)
