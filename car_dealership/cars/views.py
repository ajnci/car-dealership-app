from django.views import View
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Car
from django.shortcuts import render
from .serializers import CarSerializer
import logging

logger = logging.getLogger(__name__)

# class CarAPIView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request, *args, **kwargs):
#         print(request.query_params)
#         car_id = request.query_params.get('id', None)
#         car_name = request.query_params.get('name', None)
        
#         if car_id:
#             try:
#                 car = Car.objects.get(id=car_id)
#                 serializer = CarSerializer(car)
#                 return Response(serializer.data)
#             except Car.DoesNotExist:
#                 return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        
#         elif car_name:
#             try:
#                 car = Car.objects.get(name=car_name)
#                 serializer = CarSerializer(car)
#                 return Response(serializer.data)
#             except Car.DoesNotExist:
#                 return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        
#         else:
#             cars = Car.objects.all()
#             serializer = CarSerializer(cars, many=True)
#             return Response(serializer.data)

class CarAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        car_id = request.query_params.get('id', None)
        car_model = request.query_params.get('model', None)

        if car_id:
            try:
                car = Car.objects.get(id=car_id)
                serializer = CarSerializer(car)
                return Response(serializer.data)
            except Car.DoesNotExist:
                return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        
        elif car_model:
            cars = Car.objects.filter(model__icontains=car_model)  # Case-insensitive search
            serializer = CarSerializer(cars, many=True)
            return Response(serializer.data)
        
        else:
            cars = Car.objects.all()
            serializer = CarSerializer(cars, many=True)
            return Response(serializer.data)



    def put(self, request, *args, **kwargs):
        car_id = request.data.get('id', None)
        if not car_id:
            return Response({"detail": "ID not provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update car data
        serializer = CarSerializer(car, data=request.data, partial=True)  # Use partial=True to allow partial updates
        if serializer.is_valid():
            # Handle file upload if a file is provided
            image_file = request.FILES.get('image')
            if image_file:
                car.image = image_file
                car.save()

            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Check if the car already exists
        # car, created = Car.objects.update_or_create(id=ids,
        #     make=make,
        #     model=model,
        #     year=year,
        #     defaults={'image': image}
        # )

        # if created:
        #     # New car was created
        #     return Response({"detail": "Success"}, status=status.HTTP_201_CREATED)
        # else:
        #     # Existing car was updated
        #     return Response({"detail": "Success"}, status=status.HTTP_200_OK)


    def delete(self, request, *args, **kwargs):
        car_id = request.data.get('id', None)
        if not car_id:
            return Response({"detail": "ID not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            car = Car.objects.get(id=car_id)
            car.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Car.DoesNotExist:
            return Response({'detail': 'Car not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error deleting car: {e}")
            return Response({'detail': 'Error deleting car.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class GetCar(APIView):
#     def get(self, request, *args, **kwargs):
#         try:
#             print(request)
#             pk = request.query_params.get('id')
#             print(pk)
#             car = Car.objects.get(id=pk)
#             serializer = CarSerializer(car)
#             return Response(serializer.data)
#         except Car.DoesNotExist:
#             return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

