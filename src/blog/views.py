from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone

from .forms import CreateBlogPost
from .models import BlogPost

from comments.forms import CreateComment
from comments.models import Comment


def blog_list_view(request):
    qs = BlogPost.objects.all()

    template_name = 'pages/blog_list.html'
    context = {'title': 'blog',
               'object_list': qs, }

    return render(request, template_name, context)


def blog_detail_view(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)
    comments = blog_post.comment_set.all()

    new_comment_form = CreateComment(request.POST or None)
    if new_comment_form.is_valid():
        new_comment = Comment.objects.create(post=blog_post)
        new_comment.user = request.user.username
        new_comment.created = timezone.now()
        new_comment.text = new_comment_form.cleaned_data['text']

        new_comment.save()

        return redirect(f'/blog/{post_id}')

    template_name = 'pages/blog_detail.html'
    context = {'blog_post': blog_post,
               'comments': comments,
               'form': new_comment_form,
               }

    return render(request, template_name, context)


@login_required
def blog_create_view(request):
    form = CreateBlogPost(request.POST or None)
    if form.is_valid():
        form.save(author=request.user)

        return redirect('blog')

    template_name = 'pages/create_post.html'
    context = {'title': 'new post',
               'form': form,
               }

    return render(request, template_name, context)


@login_required
def blog_edit_view(request, post_id):
    old = get_object_or_404(BlogPost, id=post_id)

    if str(request.user) != str(old.author):
        return HttpResponse('Unauthorized', status=401)

    form = CreateBlogPost(request.POST or None, instance=old)

    if form.is_valid():
        form.save(modified=timezone.now())
        return redirect(f'/blog/{post_id}')

    template_name = 'pages/create_post.html'
    context = {'title': f'edit: {old.title}',
               'form': form,
               }

    return render(request, template_name, context)


@login_required
def blog_delete_view(request, post_id):
    post = get_object_or_404(BlogPost, id=post_id)

    if str(request.user) != str(post.author):
        return HttpResponse('Unauthorized', status=401)

    if request.method == 'POST':
        post.delete()
        return redirect('/blog')

    template_name = 'pages/delete_post.html'
    context = {'title': 'delete post',
               'post': post
               }

    return render(request, template_name, context)
