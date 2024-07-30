from django.db import models

# Create your models here.

class Car(models.Model):
    make = models.CharField(max_length=200)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    image = models.ImageField(upload_to='cars/')
    
    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"
