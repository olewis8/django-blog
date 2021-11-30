from django import forms

from .models import (BlogPost)


class CreateBlogPost(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'content']

    def save(self, commit=True, **kwargs):
        author = None
        modified = None

        if 'author' in kwargs:
            author = kwargs.pop('author')
        if 'modified' in kwargs:
            modified = kwargs.pop('modified')

        m = super(CreateBlogPost, self).save(commit=False, **kwargs)

        if m.author == '' and author is not None:
            m.author = author
        if modified is not None:
            m.modified = modified

        m.save()
