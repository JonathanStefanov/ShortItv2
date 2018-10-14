from django.shortcuts import render
from api.models import ShortUrl
from django.http import Http404, HttpResponseRedirect


def redirect(request, short_url):
    try:
        short_url = ShortUrl.objects.get(short_url=short_url)
    except ShortUrl.DoesNotExist:
        raise Http404
    long_url = short_url.long_url
    return HttpResponseRedirect(long_url)

