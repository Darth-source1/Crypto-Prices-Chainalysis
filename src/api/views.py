import json
import urllib.request

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework.views import Response
from rest_framework.views import APIView


class HomeView(APIView):
    def get(self, request):
        return Response({'message': 'Welcome to the home page'})


def apiCall(array):
    BuyData = []
    sellData = []
    for i in array:
        apiLink = f"https://api.cryptowat.ch/markets/coinbase-pro/{i['name']}usd/orderbook?apikey=HCQVOZC2OGABFG7N1F64"
        makeRequest = urllib.request.urlopen(apiLink).read()
        Requestdata = json.loads(makeRequest)
        finalDataBuy = {
            'symbol': i["symbol"],
            'image':i["image"],
            "Name":i["mainName"],
            "items" : [
                { 'provider': 'Coinbase Pro', 'price': float(Requestdata['result']['asks'][0][0])},
            ],
        }

        finalDataSell = {
            'symbol': i["symbol"],
            'image':i["image"],
            "Name":i["mainName"],
            "items": [
                { 'provider': 'Coinbase Pro', 'price': float(Requestdata['result']['bids'][0][0])},
            ],
        }
        BuyData.append(finalDataBuy)
        sellData.append(finalDataSell)

    for j in array:
        apiLink = f"https://api.cryptowat.ch/markets/binance-us/{j['name']}usd/orderbook?apikey=HCQVOZC2OGABFG7N1F64"
        makeRequest = urllib.request.urlopen(apiLink).read()
        Requestdata = json.loads(makeRequest)
        finalDataBuy = {
            'symbol': j["symbol"],
            'image':i["image"],
            "Name":i["mainName"],
            "items" : [
                { 'provider': 'Binance US', 'price': float(Requestdata['result']['asks'][0][0])}
            ],
        }

        finalDataSell = {
            'symbol': j["symbol"],
            'image':i["image"],
            "Name":i["mainName"],
            "items": [
                { 'provider': 'Binance US', 'price': float(Requestdata['result']['bids'][0][0])}
            ],
        }
        BuyData.append(finalDataBuy)
        sellData.append(finalDataSell)
    
    return (BuyData,sellData)


class CryptoPriceView(APIView):
    
    @method_decorator(cache_page(3))
    def get(self, request):
        btclogo = "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
        ethlogo = "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png"
        sollogo = "https://cryptologos.cc/logos/solana-sol-logo.png?v=014"
        adalogo = "https://cryptologos.cc/logos/cardano-ada-logo.png?v=014"
        params = [
        {"symbol":"BTC","name":"btc","image":btclogo,"mainName":"Bitcoin"},
        {"symbol":"ETH","name":"eth","image":ethlogo,"mainName":"Ethereum"},
        {"symbol":"SOL","name":"sol","image":sollogo,"mainName":"Solana"},
        {"symbol":"ADA","name":"ada","image":adalogo,"mainName":"Cardano"}]

        returnData = apiCall(params)
        
        for i in returnData[0]:
            i['items'] = sorted(i['items'], key=lambda x: x['price'],reverse=True)
        
        for j in returnData[1]:
            j['items'] = sorted(j['items'], key=lambda x: x['price'], reverse=True)

        providers = {
            "buy":returnData[0],
            "sell":returnData[1]
        }
        return Response(providers)
