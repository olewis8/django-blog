from django.db import models


class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    content = models.TextField()

    def get_absolute_url(self):
        return f'/blog/{self.id}'
