from django.db import models
from django.utils import timezone

# Create your models here.


class WallCard(models.Model):
    text = models.CharField(max_length=300)
    author = models.CharField(max_length=100)

    created = models.DateTimeField(default=timezone.now, editable=False)
    modified = models.DateTimeField(default=timezone.now, editable=True)
    edited = models.BooleanField(default=False)
