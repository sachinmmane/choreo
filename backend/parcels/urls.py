from django.urls import path
from .views import UploadFileView, CheckContainerView, StatusListCreate, StatusUpdate, StatusDelete

urlpatterns = [
    path('upload', UploadFileView.as_view(), name='file-upload'),
    path('check-container/<str:container_id>', CheckContainerView.as_view(), name='check-container'),
    path('status/', StatusListCreate.as_view(), name='status-list'),
    path('status/<int:pk>/', StatusUpdate.as_view(), name='status-update'),
    path('status/delete/<int:pk>', StatusDelete.as_view(), name='delete-status'),
]
