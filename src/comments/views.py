from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .models import Comment


@login_required
def create_comment(request):
    template_name = ''
    context = {}

    return render(request, template_name, context)


def list_comment(request, post_id):
    qs = Comment.objects.filter(Comment.post.id == post_id)

    template_name = 'list-comments.html'
    context = {'comments': qs, }

    return render(request, template_name, context)


@login_required
def delete_comment(request):
    template_name = ''
    context = {}

    return render(request, template_name, context)
