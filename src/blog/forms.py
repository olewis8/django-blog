from django import forms

from .models import (BlogPost)


class CreateBlogPost(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'author', 'content']
