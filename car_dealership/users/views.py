from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, UserSerializer, UserCreateSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # Print the incoming request data
        print('Request Data:', request.data)
        
        # Pass request data to serializer for validation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Print validated data
        print('Validated Data:', serializer.validated_data)
        
        # Call create method
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"detail":"Success"}, status=status.HTTP_201_CREATED)

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Get the refresh token from the request data
        refresh_token = request.data.get('refresh')
        if refresh_token:
            try:
                # Create a RefreshToken instance
                token = RefreshToken(refresh_token)
                # Blacklist the token to effectively log the user out
                token.blacklist()
                return Response({"detail": "Logout successful."}, status=205)
            except Exception as e:
                return Response({"detail": str(e)}, status=400)
        return Response({"detail": "Refresh token not provided."}, status=400)
