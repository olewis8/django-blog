from django import forms

from .models import (Comment)


class CreateComment(forms.Form):
    text = forms.CharField(widget=forms.Textarea())
