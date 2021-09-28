from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import CustomUser
# from ebooks.models import Ebook, Review

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username','email','is_staff']


# admin.site.register(Ebook)
# admin.site.register(Review)
admin.site.register(CustomUser,CustomUserAdmin)


