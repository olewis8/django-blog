from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q, Count
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.utils.http import url_has_allowed_host_and_scheme
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import RedirectView

from .forms import CreateBlogPost
from .models import BlogPost

from users.models import Profile


# PAGES

@login_required
def home_page(request):
    template_name = 'pages/blog_home.html'
    return render(request, template_name)


@login_required
def discover_page(request):
    template_name = 'pages/blog_discover.html'
    return render(request, template_name)


def post_detail_page(request, post_id):
    template_name = 'pages/blog_detail.html'
    return render(request, template_name)


def search_results_page(request):
    query = request.POST.get('query') or None

    template_name = 'pages/search_results.html'
    context = {'query': query}

    return render(request, template_name, context)


@login_required
def create_post_page(request):
    form = CreateBlogPost(request.POST or None)
    author = get_object_or_404(Profile, user=request.user)
    next_url = request.POST.get("next") or None

    if form.is_valid():
        post = form.save(commit=False)
        post = form.save(author=author)

        new_post_url = next_url + f'/{post.id}'

        if next_url is not None and url_has_allowed_host_and_scheme(new_post_url, settings.ALLOWED_HOSTS):
            return redirect(new_post_url)

    template_name = 'pages/create_post.html'
    context = {'form': form,
               }

    return render(request, template_name, context)


@login_required
def update_post_page(request, post_id):
    old = get_object_or_404(BlogPost, id=post_id)
    author = get_object_or_404(Profile, user=request.user)

    old_title = old.title
    old_content = old.content

    if str(author) != str(old.author):
        return HttpResponse('Unauthorized', status=401)

    form = CreateBlogPost(request.POST or None, instance=old)
    next_url = request.POST.get("next") or None

    if form.is_valid():
        form.save(modified=timezone.now())

        new_post_url = next_url + f'/{post_id}'

        if next_url is not None and url_has_allowed_host_and_scheme(new_post_url, settings.ALLOWED_HOSTS):
            return redirect(new_post_url)

    template_name = 'pages/update_post.html'
    context = {'post_id': post_id,
               'form': form,
               'old_title': old_title,
               'old_content': old_content
               }

    return render(request, template_name, context)


@login_required
def delete_post_page(request, post_id):
    post = get_object_or_404(BlogPost, id=post_id)
    author = get_object_or_404(Profile, user=request.user)

    if str(author) != str(post.author):
        return HttpResponse('Unauthorized', status=401)

    if request.POST.get('next') == 'yes':
        post.delete()
        return redirect('/blog')
    elif request.POST.get('next') == 'no':
        return redirect(f'/blog/{post_id}')

    template_name = 'pages/delete_post.html'
    context = {'post': post
               }

    return render(request, template_name, context)


# API

def retrieve_blog_detail(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)
    author = get_object_or_404(Profile, id=blog_post.author.id)

    data = blog_post.serialize()
    data['author_location'] = author.location
    data['author_bio'] = author.bio

    return JsonResponse(data)


def retrieve_user_posts(request, username):
    profile = get_object_or_404(Profile, user=get_object_or_404(User, username=username))

    qs = BlogPost.objects.all().filter(author=profile)
    data = {'response': [x.serialize() for x in qs]}

    return JsonResponse(data)


# add csrf verif.
@method_decorator(csrf_exempt, name='dispatch')
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


def retrieve_posts(request, page):
    user = get_object_or_404(User, username=request.user)

    qs = []
    if page == 'fy':
        qs = BlogPost.objects.all().filter(author__in=user.profile.following.all())
    elif page == 'disc':
        qs = BlogPost.objects.all().annotate(num_likes=Count('liked_by')).order_by('-num_likes')[:10]
    else:
        return Http404()

    posts = [x.serialize() for x in qs]
    data = {'response': posts}

    return JsonResponse(data)


def excecute_query(request, query):
    profiles_query = Profile.objects.filter(Q(user__username__contains=query) | Q(location__contains=query))
    posts_query = BlogPost.objects.filter(Q(title__contains=query) | Q(content__contains=query) | Q(author__user__username__contains=query))

    profiles = [x.serialize() for x in profiles_query]
    posts = [x.serialize() for x in posts_query]

    data = {'profiles': profiles,
            'posts': posts,
            }

    return JsonResponse(data)
