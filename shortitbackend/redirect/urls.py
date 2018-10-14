from django.urls import path, include
from . import views


urlpatterns = [
    path('<short_url>', views.redirect),
]