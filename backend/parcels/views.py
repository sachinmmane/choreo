from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Container, Address, Receipient, Parcel, Status
from departments.models import Department 
import xml.etree.ElementTree as ET
from .serializers import StatusSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
class CheckContainerView(APIView):
    def get(self, request, container_id, format=None):
        exists = Container.objects.filter(container_id=container_id).exists()
        return Response({"exists": exists}, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Container, Address, Receipient, Parcel
import xml.etree.ElementTree as ET

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Container, Address, Receipient, Parcel
from departments.models import Department  # Import the Department model
import xml.etree.ElementTree as ET

class UploadFileView(APIView):
    def post(self, request, format=None):
        file = request.FILES['file']
        xml_content = file.read()
        tree = ET.ElementTree(ET.fromstring(xml_content))
        root = tree.getroot()

        container_id = root.find('Id').text
        # Uncomment the below lines if you want to prevent duplicate containers
        # if Container.objects.filter(container_id=container_id).exists():
        #     return Response({"error": "Container already exists"}, status=status.HTTP_400_BAD_REQUEST)

        shipping_date = root.find('ShippingDate').text
        container = Container(container_id=container_id, shipping_date=shipping_date, file=xml_content)
        container.save()

        parcel_count = 0

        for parcel in root.find('parcels'):
            parcel_count += 1
            recipient = parcel.find('Receipient')
            name = recipient.find('Name').text

            address = recipient.find('Address')
            street = address.find('Street').text
            house_number = address.find('HouseNumber').text
            postal_code = address.find('PostalCode').text
            city = address.find('City').text

            address_obj, created = Address.objects.get_or_create(
                street=street,
                house_number=house_number,
                postal_code=postal_code,
                city=city
            )
            
            receipient_obj = Receipient(name=name, address=address_obj)
            receipient_obj.save()

            weight = float(parcel.find('Weight').text)
            value = float(parcel.find('Value').text)
            
            # Determine department based on weight and value
            if value > 1000:
                department_id = 10  # Insurance department
            elif weight <= 1:
                department_id = 7  # Mail department
            elif weight <= 10:
                department_id = 11  # Regular department
            else:
                department_id = 9  # Heavy department
            
            department_id = 11
            print("========= 79 value", value) 
            print("========= 79 weight", weight) 
            print("========= 79 department_id", department_id) 

            department = Department.objects.filter(id=department_id).first()
            if not department:
                return Response({"error": f"Department with id {department_id} does not exist"},status=status.HTTP_400_BAD_REQUEST)

            status_instance = Status.objects.filter(id=1).first()
            if not status_instance:
                return Response({"error": "Status with id 1 does not exist"}, status=status.HTTP_400_BAD_REQUEST)  
            
            Parcel.objects.create(
                receipient=receipient_obj,
                address=address_obj,
                weight=weight,
                value=value,
                container=container,
                department=department,
                status=status_instance  # Make sure this ID exists in the Status table
            )

        return Response({"message": "File processed and saved successfully!", "parcel_count": parcel_count}, status=status.HTTP_201_CREATED)

class StatusListCreate(generics .ListCreateAPIView):
    # Specify the serializer class to be used
    serializer_class = StatusSerializer

    # Set the permission class to ensure only authenticated users can access this view
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Define the queryset to be all Department objects
        return Status.objects.all()
    
    # Custom method to handle the creation of a new Department instance
    def perform_create(self, serializer):
      # If the serializer is valid, save the new instance else print the errors
        if serializer.is_valid():
            serializer.save()
        else:
            print (serializer.error)

class StatusUpdate(generics.UpdateAPIView):
    # Specify the serializer class to be used
    serializer_class = StatusSerializer
    # Set the permission class to ensure only authenticated users can access this view
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Define the queryset to be all Department objects
        return Status.objects.all()

class StatusDelete(generics.DestroyAPIView):
    # Specify the serializer class to be used
    serializer_class = StatusSerializer
    # Set the permission class to ensure only authenticated users can access this view
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Define the queryset to be all Department objects
        return Status.objects.all()

