from api.models import ShortUrl
from api.serializers import ShortUrlSerializer
from rest_framework import generics
import random
import string
import simplejson
from django.http import HttpResponse
from django.core import serializers


class ShortUrlListCreate(generics.ListCreateAPIView):
    queryset = ShortUrl.objects.all()
    serializer_class = ShortUrlSerializer


def get_short_url(request):
    random_short_url = generate(5)
    try:
        short_url = ShortUrl.objects.get(short_url=random_short_url)
    except ShortUrl.DoesNotExist:  # If the url doesn't exist, we return in json the random string
        short_url = random_short_url

        to_json = {
            "short_url": short_url
        }
        return HttpResponse(simplejson.dumps(to_json), content_type='application/json')


def get_token(request):
    random_token = generate(40)
    try:
        token = ShortUrl.objects.get(creator=random_token)
    except ShortUrl.DoesNotExist:  # If the token doesn't exist, we return in json the token
        token = random_token
        to_json = {
            "token": token
        }
        return HttpResponse(simplejson.dumps(to_json), content_type='application/json')


def get_links(request, token):
    try:
        urls = ShortUrl.objects.filter(creator=token)
        json = serializers.serialize("json", urls)

        return HttpResponse(json, content_type='application/json')

    except ShortUrl.DoesNotExist:  # If the token doesn't exist, we return in json the token
        pass  # TODO: Make an error handling thing


def generate(nb):
    caracteres = string.ascii_letters + string.digits
    aleatoire = [random.choice(caracteres) for _ in range(nb)]

    return ''.join(aleatoire)


