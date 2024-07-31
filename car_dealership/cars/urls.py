from django.urls import path
from .views import CarAPIView, CarAddView, CarUpdateView

urlpatterns = [
    path('get/', CarAPIView.as_view(), name='car-list'),
    path('get/car/', CarAPIView.as_view(), name='car-lists'),
    path('add/', CarAddView.as_view(), name='car-add'),
    path('delete/', CarAPIView.as_view(), name='car-delete'),
    path('update/', CarUpdateView.as_view(), name='car-update'),
    path('fetch/', CarAPIView.as_view(), name='car-list'),
]
