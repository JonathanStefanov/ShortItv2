from rest_framework import serializers
from api.models import ShortUrl


class ShortUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortUrl
        fields = ('long_url', 'short_url')