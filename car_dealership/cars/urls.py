from django.urls import path
from .views import CarAPIView

urlpatterns = [
    path('get/', CarAPIView.as_view(), name='car-list'),
    path('get/car/', CarAPIView.as_view(), name='car-lists'),
    path('add/', CarAPIView.as_view(), name='car-add'),
    path('delete/', CarAPIView.as_view(), name='car-delete'),
    path('update/', CarAPIView.as_view(), name='car-update'),
    path('fetch/', CarAPIView.as_view(), name='car-list'),
]
