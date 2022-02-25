from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=300, blank=True)
    location = models.CharField(max_length=30, blank=True)

    followers = models.ManyToManyField('self', blank=True, related_name='follower_set', symmetrical=False)
    following = models.ManyToManyField('self', blank=True, related_name='following_set', symmetrical=False)

    def get_profile_url(self):
        return f'/users/{self.user.username}'

    def serialize(self):
        data = {'id': self.id,
                'username': self.user.username,
                'bio': self.bio,
                'location': self.location,
                'followers_count': self.followers.count(),
                'following_count': self.following.count(),
                }

        return data


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
