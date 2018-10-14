from api.models import ShortUrl
from api.serializers import ShortUrlSerializer
from rest_framework import generics
import random
import string
import simplejson
from django.http import HttpResponse


class ShortUrlListCreate(generics.ListCreateAPIView):
    queryset = ShortUrl.objects.all()
    serializer_class = ShortUrlSerializer


def get_short_url(request):
    random_short_url = generate()
    try:
        short_url = ShortUrl.objects.get(short_url=random_short_url)
    except ShortUrl.DoesNotExist:  # If the url doesn't exist, we return in json the random string
        short_url = random_short_url

        to_json = {
            "short_url": short_url
        }
        return HttpResponse(simplejson.dumps(to_json), content_type='application/json')



def generate():
    caracteres = string.ascii_letters + string.digits
    aleatoire = [random.choice(caracteres) for _ in range(5)]

    return ''.join(aleatoire)


