from rest_framework import generics
from rest_framework import mixins, permissions

from django.shortcuts import render

from ebooks.models import Ebook, Review
from ebooks.api.serializers import EbookSerializer, ReviewSerializer

from .permissions import IsAdminUserOrReadOnly,IsReviewAuthorOrReadOnly

from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404

from rest_framework import viewsets

class AllEbookListCreateAPIView(mixins.ListModelMixin,
                             mixins.CreateModelMixin,
                             generics.GenericAPIView):
 
    queryset = Ebook.objects.all()
    serializer_class = EbookSerializer
    permission_class = [IsAdminUserOrReadOnly]


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
        

class EbookListCreateAPIView(viewsets.ModelViewSet):
 
    queryset = Ebook.objects.all()
    serializer_class = EbookSerializer
    permission_class = [IsAdminUserOrReadOnly]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)

    # def post(self, request, *args, **kwargs):
    #     return self.create(request, *args, **kwargs)

class ReviewListCreateAPIView(generics.CreateAPIView):
    # ALLOWS USER TO POST AN ANSWER TO A SPECIFIC SLUFG IF THEY HAVENT ALREADY
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_class = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self , serializer):

        kwarg_slug = self.kwargs.get('slug')
        question = get_object_or_404(Ebook,slug =kwarg_slug )
        print(question.reviews.all())

        ebook = self.request.data.get('ebook')

        
        review_author = self.request.user 
        
        review_queryset = question.reviews.filter(ebook = ebook,
                                                review_author=review_author)

        if review_queryset.exists():
            raise ValidationError("You Have Already Reviewed this Ebook!")

        serializer.save( review_author=review_author)


        

class AllReviewListCreateAPIView(mixins.ListModelMixin,
                             mixins.CreateModelMixin,
                             generics.GenericAPIView):
 
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_class = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ReviewListAPIView(generics.ListAPIView):
    #LIST ALL REVIEWS TO SPECIFIC E BOOK
    serializer_class = ReviewSerializer

    def get_queryset(self):
        kwarg_slug = self.kwargs.get("slug")
        # dont ask y
        return Review.objects.filter(ebook__slug=kwarg_slug)


class Reviewsas(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer






