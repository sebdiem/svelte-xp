import json

from django.contrib.auth import (
    authenticate,
    login as django_login,
    logout as django_logout,
)
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_POST


@csrf_exempt
@ensure_csrf_cookie
@require_POST
def set_csrf_token(request):
    """
    This will be `/api/set-csrf-cookie/` on `urls.py`
    """
    return JsonResponse({"details": "CSRF cookie set"})


@require_POST
def login(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse(
            {"detail": "Please provide username and password."}, status=400
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"detail": "Invalid credentials."}, status=400)

    django_login(request, user)
    return JsonResponse({"detail": "Successfully logged in."})


@require_POST
def logout(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "You're not logged in."}, status=400)

    django_logout(request)
    return JsonResponse({"detail": "Successfully logged out."})


def whoami(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})

    return JsonResponse({"isAuthenticated": True, "username": request.user.username})
