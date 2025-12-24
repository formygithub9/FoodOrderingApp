from django.urls import path
from .views import *
urlpatterns = [
    path('admin-login/',admin_login_api),
    path('add-category/',add_category),
    path('categories/',list_categories),
    path('add-food-item/',add_food_item),
    path('foods/',list_foods),
    path('food_search/',food_search),
    path('random_foods/',random_foods),
    path('register/',register_user),
]


