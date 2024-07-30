from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_prelogin, name='dashboard_prelogin'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('index/', views.login, name='index'),
    path('signup/', views.signup, name='signup'),
]
