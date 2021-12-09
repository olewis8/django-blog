from django.shortcuts import HttpResponse

# Create your views here.


def home_view(request):
    return HttpResponse('<h1>coming soon</h1>')
