from django.urls import path, include
from ebooks.api.views import AllEbookListCreateAPIView, EbookListCreateAPIView,ReviewListCreateAPIView,AllReviewListCreateAPIView,ReviewListAPIView,Reviewsas
from rest_framework.routers import DefaultRouter
# from  import views as v

router = DefaultRouter()
router.register(r'book',EbookListCreateAPIView)



urlpatterns = [ 
    # get all ebooks folllows lookup
    path('', include(router.urls)),

    # generic get all ebook
    path('ebooks/',AllEbookListCreateAPIView.as_view(), name= 'ebook-list'),

    # only review post without ebooks , get list not allowed
    path('book/<slug:slug>/ans',ReviewListCreateAPIView.as_view(),name = 'review'),

    # all reviews for a specific e book
    path('book/<slug:slug>/al',ReviewListAPIView.as_view(),name = 'reviewAL'),
    
    # generic get all reviews
    path('reviews/',AllReviewListCreateAPIView.as_view(), name= 'r-list'),

    path('reviews/<int:pk>/',Reviewsas.as_view(), name= 'r-list_d'),
]                      