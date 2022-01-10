from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.views.generic import RedirectView

from .models import Profile

from blog.models import BlogPost


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.success(request, 'username and password don\'t match')
            return redirect('login')

    else:
        template_name = 'authenticate/login.html'
        context = {'title': 'log in'}

        return render(request, template_name, context)


@login_required
def logout_view(request):
    template_name = 'authenticate/logout.html'
    context = {'title': 'log out'}

    if request.method == 'POST':
        logout(request)
        return redirect('home')

    return render(request, template_name, context)


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()

            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']

            user = authenticate(request, username=username, password=password)
            login(request, user)

            return redirect('home')
    else:
        form = UserCreationForm()

    template_name = 'authenticate/register.html'
    context = {'title': 'create account',
               'form': form}

    return render(request, template_name, context)


@login_required
def profile_view(request, username):
    user = get_object_or_404(User, username=username)

    blog_posts = BlogPost.objects.filter(author=user.username)

    template_name = 'pages/profile.html'
    context = {'username': user.username,
               'location': user.profile.location,
               'bio': user.profile.bio,
               'blog_posts': blog_posts,
               'followers': user.profile.followers,
               'following': user.profile.following,
               }

    return render(request, template_name, context)


class toggle_follow(RedirectView):
    def get_redirect_url(self, *args, **kwargs):

        user = get_object_or_404(User, username=self.request.user)
        target_user = get_object_or_404(User, username=kwargs.get('username'))

        profile = get_object_or_404(Profile, user=user)
        target_profile = get_object_or_404(Profile, user=target_user)

        url_ = Profile.objects.get(user=target_user).get_profile_url()

        if user.is_authenticated:
            print('awooga')
            if profile in target_profile.followers.all():
                target_profile.followers.remove(profile)
                user.profile.following.remove(target_profile)
            else:
                target_profile.followers.add(profile)
                user.profile.following.add(target_profile)

        return url_


def followers_view(request, username):
    user = get_object_or_404(User, username=username)
    followers = user.profile.followers.all()

    template_name = 'pages/follows.html'
    context = {'user': user,
               'follower_page': True,
               'follows': followers,
               }

    return render(request, template_name, context)


def following_view(request, username):
    user = get_object_or_404(User, username=username)
    following = user.profile.following.all()

    template_name = 'pages/follows.html'
    context = {'user': user,
               'follower_page': False,
               'follows': following,
               }

    return render(request, template_name, context)
