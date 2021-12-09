from django import forms

from .models import (Comment)


class CreateComment(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']

    def save(self, commit=True, **kwargs):
        user = None

        if 'user' in kwargs:
            user = kwargs.pop('user')

        m = super(CreateComment, self).save(commit=False, **kwargs)

        if m.user == '' and user is not None:
            m.user = user

        m.save()
