from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_event_sunday_school_communion'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoryEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('period', models.CharField(help_text="e.g. '1919' or '1920- och 1930-talet'", max_length=100)),
                ('year_start', models.IntegerField(help_text='Starting year for sorting')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('images', models.JSONField(blank=True, default=list, help_text='List of image filenames served from /images/ folder')),
                ('leaders', models.JSONField(blank=True, default=list, help_text="List of leader strings, e.g. 'Georg Steen 1919-1921'")),
                ('order', models.IntegerField(default=0, help_text='Display order')),
            ],
            options={
                'db_table': 'history_entries',
                'ordering': ['order', 'year_start'],
            },
        ),
    ]
