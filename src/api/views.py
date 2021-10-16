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
        url_coinbase_btc = 'https://api.cryptowat.ch/markets/coinbase-pro/btcusd/orderbook'
        url_coinbase_eth = 'https://api.cryptowat.ch/markets/coinbase-pro/ethusd/orderbook'
        
        url_binance_btc = 'https://api.cryptowat.ch/markets/binance/btcusd/orderbook'
        url_binance_eth = 'https://api.cryptowat.ch/markets/binance/ethusd/orderbook'
        
        coinbase_btc = urllib.request.urlopen(url_coinbase_btc).read()
        coinbase_eth = urllib.request.urlopen(url_coinbase_eth).read()

        binance_eth = urllib.request.urlopen(url_binance_eth).read()
        binance_btc = urllib.request.urlopen(url_binance_btc).read()

        cb_eth = json.loads(coinbase_eth)
        cb_btc = json.loads(coinbase_btc)

        bnb_eth = json.loads(binance_eth)
        bnb_btc = json.loads(binance_btc)

        btc_providers_market_buy_price = {
            'symbol': "BTC",
            "items" : [
                { 'provider': 'Coinbase Pro', 'price': float(cb_btc['result']['asks'][0][0])},
                { 'provider': 'Binance', 'price': float(bnb_btc['result']['asks'][0][0])},
            ],
        }
        eth_providers_market_buy_price = {
            'symbol': "ETH",
            "items": [
                { 'provider': 'Coinbase Pro', 'price': float(cb_eth['result']['asks'][0][0])},
                { 'provider': 'Binance', 'price': float(bnb_eth['result']['asks'][0][0])},
            ],
        }

        btc_providers_market_sell_price = {
            'symbol': "BTC",
            "items" : [
                { 'provider': 'Coinbase Pro', 'price': float(cb_btc['result']['bids'][0][0])},
                { 'provider': 'Binance', 'price': float(bnb_btc['result']['bids'][0][0])},
            ],
        }
        eth_providers_market_sell_price = {
            'symbol': "ETH",
            "items": [
                { 'provider': 'Coinbase Pro', 'price': float(cb_eth['result']['bids'][0][0])},
                { 'provider': 'Binance', 'price': float(bnb_eth['result']['bids'][0][0])},
            ],
        }

        btc_providers_market_buy_price['items'] = sorted(btc_providers_market_buy_price['items'], key=lambda x: x['price'])
        eth_providers_market_buy_price['items'] = sorted(eth_providers_market_buy_price['items'], key=lambda x: x['price'])
        

        btc_providers_market_sell_price['items'] = sorted(btc_providers_market_sell_price['items'], key=lambda x: x['price'])
        eth_providers_market_sell_price['items'] = sorted(eth_providers_market_sell_price['items'], key=lambda x: x['price'])
        
        providers = {
            "buy":[btc_providers_market_buy_price, eth_providers_market_buy_price],
            "sell":[btc_providers_market_sell_price, eth_providers_market_sell_price]
        }
        return Response(providers)
