"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include, re_path

from django_registration.backends.one_step.views import RegistrationView

from core.views import IndexTemplateView
from users.forms import CustomUserForm

urlpatterns = [
    path('admin/', admin.site.urls),

    #DJANGO REGISTERATION CUSTOM FORM
    path("accounts/register/",
         RegistrationView.as_view(
             form_class=CustomUserForm,
             success_url="/",
             ), name="django_registration_register"), 

    #DJANGO REGISTERATION DEFAULT
    path("accounts/",
         include("django_registration.backends.one_step.urls")),

    #DJANGO REGISTERATION DEFAULT
    path("accounts/",
         include("django.contrib.auth.urls")),

    path("api/",
         include("users.api.urls")),

#     path("api/",
#          include("questions.api.urls")),

    #RESTFrameworks in built auth
    path("api-auth/",
         include("rest_framework.urls")),

    # #browsable endpoint  AND pre created api ,JSON RESP
    # path("api/rest-auth/",
    #      include("rest_auth.urls")),
    
    # #browsable endpoint pre created api
    # path("api/rest-auth/registration/",
    #      include("rest_auth.registration.urls")),

    path('app/', include('ebooks.api.urls')),

    path('', include('frontend.urls')),

    # request from any url if user authenticated 
    re_path(r"^.*$", IndexTemplateView.as_view(), name="entry-point")
]
