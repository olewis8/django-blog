from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.utils.http import is_safe_url
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import RedirectView

from .forms import CreateBlogPost
from .models import BlogPost

from comments.forms import CreateComment
from comments.models import Comment

from users.models import Profile


@login_required
def blog_home(request):
    template_name = 'pages/blog_home.html'
    return render(request, template_name)


def blog_detail(request, post_id):
    template_name = 'pages/blog_detail.html'
    return render(request, template_name)


###### these could probably be combines ######

def retrieve_posts(request, page):
    user = get_object_or_404(User, username=request.user)

    if page == 'fy':
        qs1 = BlogPost.objects.all().filter(author__in=user.profile.following.all())
        # qs2 = BlogPost.objects.all().filter(author=get_object_or_404(Profile, user=user))
        # qs = (qs1 | qs2).distinct()

        posts = [x.serialize() for x in qs1]
        data = {'response': posts}

        return JsonResponse(data)

    elif page == 'disc':
        qs = BlogPost.objects.all()
        posts = [x.serialize() for x in qs]
        data = {'response': posts}

        return JsonResponse(data)


def rest_blog_detail(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)
    data = blog_post.serialize()

    return JsonResponse(data)

##############################################


def retrieve_user_posts(request, username):
    profile = get_object_or_404(Profile, user=get_object_or_404(User, username=username))

    qs = BlogPost.objects.all().filter(author=profile)
    data = {'response': [x.serialize() for x in qs]}

    return JsonResponse(data)


@login_required
def blog_create(request):
    form = CreateBlogPost(request.POST or None)
    author = get_object_or_404(Profile, user=request.user)
    next_url = request.POST.get("next") or None

    if form.is_valid():
        post = form.save(commit=False)
        post = form.save(author=author)

        new_post_url = next_url + f'/{post.id}'

        if next_url is not None and is_safe_url(new_post_url, settings.ALLOWED_HOSTS):
            return redirect(new_post_url)

    template_name = 'pages/create_post.html'
    context = {'title': 'new post',
               'form': form,
               }

    return render(request, template_name, context)


@login_required
def blog_edit(request, post_id):
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
def blog_delete(request, post_id):
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

# add csrf verif.
@method_decorator(csrf_exempt, name='dispatch')
class toggle_like(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        print(self.request.is_ajax())
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
