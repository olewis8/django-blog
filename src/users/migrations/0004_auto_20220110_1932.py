# Generated by Django 2.2 on 2022-01-10 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_follow'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='followers',
            field=models.ManyToManyField(blank=True, related_name='follower_set', to='users.Profile'),
        ),
        migrations.AddField(
            model_name='profile',
            name='following',
            field=models.ManyToManyField(blank=True, related_name='following_set', to='users.Profile'),
        ),
        migrations.DeleteModel(
            name='Follow',
        ),
    ]