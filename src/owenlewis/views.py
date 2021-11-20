from django.shortcuts import render

from .forms import ContactForm


def home_view(request):
    template_name = 'pages/card.html'
    context = {'title': 'hello world,,,',
               'body': 'welcome to my website',
               }

    return render(request, template_name, context)


def about_view(request):
    template_name = 'pages/card.html'
    context = {'title': 'about me',
               'body': 'i\'m owen bla bla bla'
               }

    return render(request, template_name, context)


def contact_view(request):
    form = ContactForm(request.POST or None)

    template_name = 'form.html'
    context = {'title': 'contact me',
               'form': form,
               }

    return render(request, template_name, context)
