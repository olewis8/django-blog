from django.contrib.auth.models import User

from django.db import models
from django.utils import timezone

from users.models import Profile


class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Profile, null=True, blank=True, on_delete=models.CASCADE)
    content = models.TextField()

    liked_by = models.ManyToManyField(User, blank=True, related_name='likes')

    created = models.DateTimeField(default=timezone.now, editable=False)
    modified = models.DateTimeField(default=timezone.now, editable=True)
    edited = models.BooleanField(default=False)

    def serialize(self):
        data = {'id': self.id,
                'title': self.title,
                'author': self.author.user.username,
                'content': self.content,
                'created': self.created,
                'modified': self.modified,
                'edited': self.edited,
                'like_count': self.liked_by.count()
                }

        return data

    def get_absolute_url(self):
        return f'/blog/{self.id}'
