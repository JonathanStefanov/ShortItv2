from django.db import models


class ShortUrl(models.Model):
    '''
    Short Url Model
    '''
    long_url = models.URLField(max_length=2000)
    short_url = models.CharField(max_length=2000, unique=True)

    def __str__(self):
        return self.short_url


