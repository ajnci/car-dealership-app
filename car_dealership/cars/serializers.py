from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'
    
    def create(self, validated_data):
        return Car.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.make = validated_data.get('make', instance.make)
        instance.model = validated_data.get('model', instance.model)
        instance.year = validated_data.get('year', instance.year)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
