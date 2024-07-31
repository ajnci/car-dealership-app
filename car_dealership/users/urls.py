from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, UserProfileView, LogoutView, SubscribeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('logout/',LogoutView.as_view(), name='logout'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
]
