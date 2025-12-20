#django model to json conversion(serialization)
# json to django model conversion (deserialization)

from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name','creation_date']