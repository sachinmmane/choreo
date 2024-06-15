from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('departments/', views.DepartmentListCreate.as_view(), name='department-list'),
    path('departments/delete/<int:pk>', views.DepartmentListCreate.as_view(), name='delete-department'),
    path('user/register/', views.CreateUserView.as_view(), name='register'),
    path('token', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh'),
]   