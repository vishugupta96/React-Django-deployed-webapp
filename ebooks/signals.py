from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify


from ebooks.models import Ebook


from core.utils import generate_random_string


@receiver(pre_save,sender = Ebook)
def add_slug_to_book(sender,instance,*args,**kwargs):
    if instance and not instance.slug:
        slug  = slugify(instance.title)
        random_string = generate_random_string()
        instance.slug = slug + '-' + random_string
