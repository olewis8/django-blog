from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


def login_view(request):
    template_name = 'authentication/login.html'
    context = {'title': 'log in'}

    return render(request, template_name, context)
