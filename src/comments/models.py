from django.db import models
from django.utils import timezone

from blog.models import BlogPost
from users.models import Profile

import datetime


class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField()
    created = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        ordering = ['-created']

    def HTMLDisplayTime(self):
        time = str(datetime.datetime.strftime(self.created, '%b %-d %Y at %-I:%M%p')).lower()
        return time

    def serialize(self):
        data = {'id': self.id,
                'post_id': self.post.id,
                'user': self.user.user.username,
                'text': self.text,
                'created': self.HTMLDisplayTime(),
        }

        return data

    def __str__(self):
        return f'post: {self.post.pk}, user: {self.user}'
