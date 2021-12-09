from django.db import models
from django.utils import timezone

from blog.models import BlogPost
from django.contrib.auth.models import User


class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete='CASCADE')
    user = models.ForeignKey(User, on_delete='CASCADE')
    text = models.TextField()
    created = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        ordering = ['-created']
