# Generated by Django 2.2 on 2022-01-16 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(on_delete='CASCADE', to='users.Profile'),
        ),
    ]