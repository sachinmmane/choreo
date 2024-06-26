# Generated by Django 5.0.6 on 2024-06-16 09:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=255)),
                ('house_number', models.CharField(max_length=255)),
                ('postal_code', models.CharField(max_length=10)),
                ('city', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Container',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('container_id', models.CharField(max_length=255)),
                ('shipping_date', models.DateTimeField()),
                ('file', models.BinaryField()),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Receipient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='parcels.address')),
            ],
        ),
        migrations.CreateModel(
            name='Parcel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField()),
                ('value', models.FloatField()),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='parcels', to='parcels.address')),
                ('container', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='parcels', to='parcels.container')),
                ('receipient', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='parcels', to='parcels.receipient')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='parcel_department', to='parcels.status')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='parcel_status', to='parcels.status')),
            ],
        ),
    ]
