import json
import urllib.request

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework.views import Response
from rest_framework.views import APIView


class HomeView(APIView):
    def get(self, request):
        return Response({'message': 'Welcome to the home page'})


class CryptoPriceView(APIView):
    
    @method_decorator(cache_page(3))
    def get(self, request):
        url_coinbase_btc = 'https://api.cryptowat.ch/markets/coinbase-pro/btcusd/price'
        url_coinbase_eth = 'https://api.cryptowat.ch/markets/coinbase-pro/ethusd/price'
        
        url_binance_btc = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        url_binance_eth = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
        
        coinbase_btc = urllib.request.urlopen(url_coinbase_btc).read()
        coinbase_eth = urllib.request.urlopen(url_coinbase_eth).read()

        binance_eth = urllib.request.urlopen(url_binance_eth).read()
        binance_btc = urllib.request.urlopen(url_binance_btc).read()

        cb_eth = json.loads(coinbase_eth)
        cb_btc = json.loads(coinbase_btc)

        bnb_eth = json.loads(binance_eth)
        bnb_btc = json.loads(binance_btc)

        btc_providers = {
            'symbol': "BTC",
            "items" : [
                { 'provider': 'Coinbase Pro', 'price': float(cb_btc['result']['price'])},
                { 'provider': 'Binance', 'price': float(bnb_btc['price'])},
            ],
        }
        eth_providers = {
            'symbol': "ETH",
            "items": [
                { 'provider': 'Coinbase Pro', 'price': float(cb_eth['result']['price'])},
                { 'provider': 'Binance', 'price': float(bnb_eth['price'])},
            ],
        }
        btc_providers['items'] = sorted(btc_providers['items'], key=lambda x: x['price'])
        eth_providers['items'] = sorted(eth_providers['items'], key=lambda x: x['price'])
        providers = [
            btc_providers,
            eth_providers,
        ]
        return Response(providers)
