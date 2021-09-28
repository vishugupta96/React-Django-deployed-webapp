from rest_framework import serializers
from ebooks.models import Ebook, Review


class ReviewSerializer(serializers.ModelSerializer):
    review_author = serializers.StringRelatedField(read_only = True)
    class Meta:
        model = Review
        fields = ('id','review_author','review', 'sentiment','rating','ebook')


class EbookSerializer(serializers.ModelSerializer):
    reviews = serializers.StringRelatedField(many=True)

    class Meta:
        model = Ebook
        fields = ('id','title','author','description','publication_date','reviews','slug')
        read_only_fields = ('slug','reviews')

