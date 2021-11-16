from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


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
