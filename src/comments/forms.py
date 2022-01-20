from django import forms

from .models import Comment


class CreateComment(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']

    def save(self, commit=True, **kwargs):
        post = None
        user = None
        text = None
        created = None

        if 'post' in kwargs:
            post = kwargs.pop('post')
        if 'user' in kwargs:
            user = kwargs.pop('user')
        if 'text' in kwargs:
            text = kwargs.pop('text')
        if 'created' in kwargs:
            created = kwargs.pop('created')

        m = super(CreateComment, self).save(commit=False, **kwargs)

        if m.post is None and post is not None:
            m.post = post
        if m.user is None and user is not None:
            m.user = user
        if m.text is None and text is not None:
            m.text = text
        if m.created is None and created is not None:
            m.created = created

        m.save()

        return m
