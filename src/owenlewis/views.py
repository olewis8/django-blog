from django.shortcuts import render


def home_view(request):
    template_name = 'pages/card.html'
    context = {'title': 'hello world,,,',
               'body': 'welcome to my website',
               }

    return render(request, template_name, context)
