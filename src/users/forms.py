from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2',)

    def __init__(self, *args, **kwargs):
        super(UserRegistrationForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['class'] = 'form-control mb-2'
        self.fields['username'].widget.attrs['placeholder'] = 'username'
        self.fields['username'].label = ''
        self.fields['username'].help_text = None

        self.fields['password1'].widget.attrs['class'] = 'form-control mb-2'
        self.fields['password1'].widget.attrs['placeholder'] = 'password'
        self.fields['password1'].label = ''
        self.fields['password1'].help_text = None

        self.fields['password2'].widget.attrs['class'] = 'form-control mb-2'
        self.fields['password2'].widget.attrs['placeholder'] = 'confirm password'
        self.fields['password2'].label = ''
        self.fields['password2'].help_text = None
