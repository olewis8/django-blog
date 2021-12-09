from django.db import models
from django.utils import timezone

from blog.models import BlogPost
# from django.contrib.auth.models import User


class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete='CASCADE')
    # user = models.ForeignKey(User, on_delete='CASCADE')
    user = models.CharField(max_length=100)
    text = models.TextField()
    created = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'post: {self.post.pk}, user: {self.user}'
