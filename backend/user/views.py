from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, DepartmentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Import the Department model and its serializer
from .models import Department

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class DepartmentListCreate(generics.ListCreateAPIView):
    # Specify the serializer class to be used
    serializer_class = DepartmentSerializer

    # Set the permission class to ensure only authenticated users can access this view
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Define the queryset to be all Department objects
        return Department.objects.all()
    
    # Custom method to handle the creation of a new Department instance
    def perform_create(self, serializer):
      # If the serializer is valid, save the new instance else print the errors
        if serializer.is_valid():
            serializer.save()
        else:
            print (serializer.error)

class DepartmentDelete(generics.DestroyAPIView):
    # Specify the serializer class to be used
    serializer_class = DepartmentSerializer
    # Set the permission class to ensure only authenticated users can access this view
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Define the queryset to be all Department objects
        return Department.objects.all()

