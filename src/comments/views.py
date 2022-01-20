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

    if request.user.is_authenticated:
        new_comment_form = CreateComment(request.POST or None)
        new_comment(request, blog_post, new_comment_form)
        new_comment_form = CreateComment()
    else:
        new_comment_form = None

    template_name = 'pages/comments_page.html'
    context = {'comments': comments,
               'form': new_comment_form,
               }

    return render(request, template_name, context)


def retrieve_comments(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)
    comment_set = blog_post.comment_set.all()

    comments = [x.serialize() for x in comment_set]
    data = {'comments': comments}

    return JsonResponse(data)


def new_comment(request, blog_post: BlogPost, new_comment_form):
    if new_comment_form.is_valid():
        profile = get_object_or_404(Profile, user=request.user)
        new_comment = Comment.objects.create(post=blog_post, user=profile)
        new_comment.created = timezone.now()
        new_comment.text = new_comment_form.cleaned_data['text']
        new_comment.save()

    return redirect(f'/c/{blog_post.id}')
