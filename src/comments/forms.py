from django import forms

from .models import Comment


class CreateComment(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']
