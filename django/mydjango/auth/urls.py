from django.urls import path

from .views import login, logout, whoami, set_csrf_token

urlpatterns = [
    path("login", login),
    path("logout", logout),
    path("whoami", whoami),
    path("set_csrf_token", set_csrf_token),
]
