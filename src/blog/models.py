from django.db import models
from django.utils import timezone


class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    content = models.TextField()
    created = models.DateTimeField(default=timezone.now, editable=False)
    modified = models.DateTimeField(default=timezone.now, editable=True)

    def get_absolute_url(self):
        return f'/blog/{self.id}'
