from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_create_permission_groups'),
    ]

    operations = [
        migrations.AddField(
            model_name='alphaprogram',
            name='next_alpha_venue',
            field=models.CharField(blank=True, default='Pingstkyrkan Elim', max_length=200),
        ),
    ]
