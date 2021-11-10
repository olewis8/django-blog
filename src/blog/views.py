from django.shortcuts import render

# Create your views here.


def blog_list_view(request):
    template_name = 'pages/blog_list.html'
    context = {}

    return render(request, template_name, context)
