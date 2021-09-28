from django.apps import AppConfig


class EbooksConfig(AppConfig):
    name = 'ebooks'

    def ready(self):
        import ebooks.signals
