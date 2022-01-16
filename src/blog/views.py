from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.views.generic import RedirectView

from .forms import CreateBlogPost
from .models import BlogPost

from comments.forms import CreateComment
from comments.models import Comment
from users.models import Profile


@login_required
def blog_home_view(request):
    template_name = 'pages/blog_home.html'
    context = {'title': 'for you'}

    return render(request, template_name, context)


def blog_discover_view(request):
    template_name = 'pages/blog_home.html'
    context = {'title': 'discover'}

    return render(request, template_name, context)


@login_required
def rest_home_view(request):
    user = get_object_or_404(User, username=request.user)
    qs = BlogPost.objects.all().filter(author__in=user.profile.following.all())

    posts = [{'id': x.id,
              'title': x.title,
              'author': x.author.user.username,
              'content': x.content,
              'created': x.created} for x in qs]

    data = {'response': posts}

    return JsonResponse(data)


def rest_discover_view(request):
    qs = BlogPost.objects.all()

    posts = [{'id': x.id,
              'title': x.title,
              'author': x.author.user.username,
              'content': x.content,
              'created': x.created} for x in qs]

    data = {'response': posts}

    return JsonResponse(data)


def blog_detail_view(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)
    comments = blog_post.comment_set.all()

    if request.user.is_authenticated:
        new_comment_form = CreateComment(request.POST or None)
        if new_comment_form.is_valid():
            new_comment = Comment.objects.create(post=blog_post, user=get_object_or_404(Profile, user=request.user))
            # new_comment.user = request.user.username
            # new_comment.user = get_object_or_404(Profile, user=request.user)
            new_comment.created = timezone.now()
            new_comment.text = new_comment_form.cleaned_data['text']

            new_comment.save()

            return redirect(f'/blog/{post_id}')
    else:
        new_comment_form = None

    template_name = 'pages/blog_detail.html'
    context = {'blog_post': blog_post,
               'comments': comments,
               'form': new_comment_form,
               }

    return render(request, template_name, context)


@login_required
def blog_create_view(request):
    form = CreateBlogPost(request.POST or None)
    user = get_object_or_404(User, username=request.user)
    author = get_object_or_404(Profile, user=request.user)

    if form.is_valid():
        form.save(author=author)

        return redirect('blog')

    template_name = 'pages/create_post.html'
    context = {'title': 'new post',
               'form': form,
               }

    return render(request, template_name, context)


@login_required
def blog_edit_view(request, post_id):
    old = get_object_or_404(BlogPost, id=post_id)

    user = get_object_or_404(User, username=request.user)
    author = get_object_or_404(Profile, user=request.user)

    # is not instead of != ?
    if str(author) != str(old.author):
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

    user = get_object_or_404(User, username=request.user)
    author = get_object_or_404(Profile, user=request.user)

    if str(author) != str(post.author):
        return HttpResponse('Unauthorized', status=401)

    if request.method == 'POST':
        post.delete()
        return redirect('/blog')

    template_name = 'pages/delete_post.html'
    context = {'title': 'delete post',
               'post': post
               }

    return render(request, template_name, context)


class toggle_like(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        post_id = kwargs.get('post_id')
        blog_post = get_object_or_404(BlogPost, id=post_id)
        url_ = blog_post.get_absolute_url()
        user = self.request.user

        if user.is_authenticated:
            if user in blog_post.liked_by.all():
                blog_post.liked_by.remove(user)
            else:
                blog_post.liked_by.add(user)

        return url_
