from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_alter_historyentry_leaders'),
    ]

    operations = [
        migrations.CreateModel(
            name='MissionCountry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100)),
                ('continent', models.CharField(choices=[('Afrika', 'Afrika'), ('Asien', 'Asien'), ('Europa', 'Europa'), ('Amerika', 'Amerika')], max_length=20)),
                ('description', models.TextField()),
                ('images', models.JSONField(blank=True, default=list, help_text='List of image filenames served from /images/mission/ folder')),
                ('coordinates_x', models.FloatField(default=50.0, help_text='Horizontal % position on world map (0-100)')),
                ('coordinates_y', models.FloatField(default=50.0, help_text='Vertical % position on world map (0-100)')),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'mission_countries',
                'ordering': ['order', 'name'],
            },
        ),
    ]
