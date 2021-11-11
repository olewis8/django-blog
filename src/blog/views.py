from django.shortcuts import render, get_object_or_404

from .models import BlogPost


def blog_list_view(request):
    template_name = 'pages/blog_list.html'
    context = {}

    return render(request, template_name, context)


def blog_detail_view(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)

    template_name = 'pages/blog_detail.html'
    context = {'title': blog_post.title,
               'author': blog_post.author,
               'content': blog_post.content,
               }

    return render(request, template_name, context)
