from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_alpha_program_venue'),
    ]

    operations = [
        migrations.AddField(
            model_name='teammember',
            name='section',
            field=models.CharField(
                choices=[
                    ('pastorer', 'Pastorer'),
                    ('ungdom', 'Ungdomspastor'),
                    ('styrelse', 'Styrelse'),
                    ('other', 'Övrigt'),
                ],
                default='other',
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name='teammember',
            name='role_title',
            field=models.CharField(
                blank=True,
                default='',
                help_text="Displayed role title, e.g. 'Pastor & föreståndare'",
                max_length=100,
            ),
        ),
    ]
