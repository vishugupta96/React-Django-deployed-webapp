from django.db import models
import pickle
import sklearn

from django.core.validators import MinValueValidator,MaxValueValidator
# from django.contrib.auth.models import AbstractUser
from .pickle_files.cleaner import clean_review

from django.conf import settings

# from .pickle_files import count_vec_pickle,model_pickle

# from django.contrib.auth import User



class Ebook(models.Model):
    title = models.CharField(max_length=140)
    author = models.CharField(max_length=60)
    description = models.TextField()
    slug = models.SlugField(max_length=255,unique=True)
    publication_date = models.DateField()


    def __str__(self):
        return f'{self.title} {self.author}'



class Review(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    review_author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null = True )
    review = models.TextField(blank=True, null=True)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1),
                                                     MaxValueValidator(5)])
    ebook = models.ForeignKey(Ebook,
                              on_delete=models.CASCADE,
                              related_name="reviews")
    
    def __str__(self):
        return f'{self.review}'

    @property
    def sentiment(self):
        with open('ebooks/pickle_files/model_pickle','rb') as f:
            mp= pickle.load(f)
        with open('ebooks/pickle_files/count_vec_pickle','rb') as j:
            cvp= pickle.load(j)
        f_review = self.review
        f_review = f_review.split()
        f_review = clean_review(f_review)
        f_review= ' '.join(f_review)

        f_review_vec_transform = cvp.transform([f_review])
        R_pred = mp.predict(f_review_vec_transform)

        return  R_pred

