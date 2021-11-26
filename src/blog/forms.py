from django import forms

from .models import (BlogPost)


class CreateBlogPost(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'content']

    def save(self, commit=True, **kwargs):
        author = None
        if 'author' in kwargs:
            author = kwargs.pop('author')

        m = super(CreateBlogPost, self).save(commit=False, **kwargs)

        print(f'm.author {type(m.author)}')
        print(f'author {author}')

        if m.author == '' and author is not None:
            m.author = author
            m.save()
