from django.http import JsonResponse
from django.shortcuts import redirect, get_object_or_404, render
from django.utils import timezone

from .models import Comment
from .forms import CreateComment

from users.models import Profile
from blog.models import BlogPost


def comment_page(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)
    comments = blog_post.comment_set.all()
    
    template_name = 'pages/comments_page.html'
    context = {'comments': comments,
               }

    return render(request, template_name, context)


def retrieve_comments(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)
    comment_set = blog_post.comment_set.all()

    comments = [x.serialize() for x in comment_set]
    data = {'comments': comments}

    return JsonResponse(data)


def create_comment(request, post_id):
    next_url = request.POST.get('next') or None
    text = request.POST.get('text') or None

    post = get_object_or_404(BlogPost, id=post_id)
    profile = get_object_or_404(Profile, user=request.user)

    comment = Comment.objects.create(post=post, user=profile, text=text, created=timezone.now())

    return JsonResponse({}, status=201)
