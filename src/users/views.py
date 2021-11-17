from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect


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
