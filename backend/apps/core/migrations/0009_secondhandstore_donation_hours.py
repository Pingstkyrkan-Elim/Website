from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_secondhandstore'),
    ]

    operations = [
        migrations.AddField(
            model_name='secondhandstore',
            name='donation_hours',
            field=models.JSONField(
                blank=True,
                default=list,
                help_text='Opening hours for Gåvomottagning (donation drop-off), same format as opening_hours',
            ),
        ),
    ]
