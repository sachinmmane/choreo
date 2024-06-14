from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Department(models.Model):
    # Define the primary key for the Department model as a CharField with a maximum length of 100 characters
    id = models.CharField(primary_key=True, max_length=100)
    # Define a name field for the Department model as a CharField with a maximum length of 100 characters
    name = models.CharField(max_length=100)

    def __str__(self):
        # Define the string representation of the Department model to return the name of the department
        return self.name