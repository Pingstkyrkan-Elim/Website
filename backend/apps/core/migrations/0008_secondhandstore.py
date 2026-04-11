from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_missioncountry'),
    ]

    operations = [
        migrations.CreateModel(
            name='SecondHandStore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(default='PMU Second Hand', max_length=200)),
                ('tagline', models.CharField(blank=True, max_length=300)),
                ('description', models.TextField()),
                ('address', models.CharField(max_length=200)),
                ('phone', models.CharField(blank=True, max_length=50)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('opening_hours', models.JSONField(blank=True, default=list, help_text='List of {day, hours} objects')),
                ('images', models.JSONField(blank=True, default=list, help_text='List of image filenames served from /images/secondhand/ folder')),
                ('pmu_url', models.URLField(blank=True, default='https://pmu.se')),
                ('donation_info', models.TextField(blank=True, help_text='Instructions for donating items to the store')),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'secondhand_store',
            },
        ),
    ]
