# Generated by Django 2.1.7 on 2019-10-28 09:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('meetingoverflow', '0008_auto_20191028_0900'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agenda',
            name='parent_agenda',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='meetingoverflow.Agenda'),
        ),
    ]
