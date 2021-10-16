from django.urls import path, include
from django.conf.urls import url
from django.conf import settings

from rest_framework.routers import DefaultRouter

from api.views import CryptoPriceView


router = DefaultRouter()
urlpatterns = [
    path('prices/', CryptoPriceView.as_view(), name="prices"),
]
