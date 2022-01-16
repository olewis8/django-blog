from django.shortcuts import redirect, get_object_or_404
from django.utils import timezone

from .models import Comment
from .forms import CreateComment

from users.models import Profile
from blog.models import BlogPost

def new_comment(request, blog_post: BlogPost, new_comment_form):

    if new_comment_form.is_valid():
        profile = get_object_or_404(Profile, user=request.user)
        new_comment = Comment.objects.create(post=blog_post, user=profile)
        new_comment.created = timezone.now()
        new_comment.text = new_comment_form.cleaned_data['text']

        new_comment.save()

    return redirect(f'/blog/{blog_post.id}')
