from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.ShortUrlListCreate.as_view()),
    path('get_short_url', views.get_short_url)
]