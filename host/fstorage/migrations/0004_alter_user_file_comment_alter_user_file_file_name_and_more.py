# Generated by Django 4.2 on 2023-05-08 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fstorage', '0003_alter_user_file_file_alter_user_file_last_download'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_file',
            name='comment',
            field=models.CharField(max_length=350),
        ),
        migrations.AlterField(
            model_name='user_file',
            name='file_name',
            field=models.CharField(max_length=350),
        ),
        migrations.AlterField(
            model_name='user_file',
            name='original_file_name',
            field=models.CharField(max_length=350),
        ),
    ]
