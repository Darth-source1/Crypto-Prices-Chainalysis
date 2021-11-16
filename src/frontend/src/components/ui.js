import React from 'react';
import Card from './card';


export default function Ui(props) {
    const mySet = new Set();
    const array = []
    for (let property in props.response.cryptos) {
        for (let k of props.response.cryptos[property]) {
            mySet.add(k.symbol);
        }
    }

    const mapToArray = ((mySet) => {
        for (let i of mySet) {
            array.push(i);
        }
    }
    );
    mapToArray(mySet);
    return (
        <>
            <div className="App">
                <div className="wrapper">
                    <h1>CRYPTO PRICES</h1>
                    {!props.response.loaded && <div className="loading">
                        {props.response.placeholder}
                    </div>
                    }
                    {props.response.error && <div className="error-alert">
                        {props.response.placeholder}
                    </div>
                    }
                    <br />
                    <div className="crypto-list">
                        {array.map((name) => {
                            let imageCounter = 0
                            let nameCounter = 0
                            let buyPrice = 0
                            let sellPrices = 0
                            let sellPriceCounter = 0
                            let buyPos = 0
                            let sellPos = 0
                            let buyPriceCounter = 0
                            return (
                                <div className="crypto-item">
                                    <div className="card-crypto">
                                        <div style={{ display: 'flex' }}>
                                            <div className="crypto-logo">
                                                {props.response.cryptos.buy.map((images) => {
                                                    if (images.symbol == name) {
                                                        buyPriceCounter++
                                                        if (buyPriceCounter <= 1) {
                                                            buyPrice = images.items[0]?.price.toFixed(4) ? images.items[0]?.price.toFixed(4) : images.items[0]?.price.toFixed(2)
                                                        }
                                                        imageCounter++
                                                        if (imageCounter <= 1) {
                                                            return (
                                                                <img src={images.image} alt="" />
                                                            )
                                                        }
                                                    }
                                                })}
                                            </div>
                                            <div className="crypto-info">
                                                {props.response.cryptos.buy.map((mainName) => {
                                                    if (mainName.symbol == name) {
                                                        nameCounter++
                                                        if (nameCounter <= 1) {
                                                            return (
                                                                <span className="crypto-sysmol">{mainName.Name}</span>
                                                            )
                                                        }

                                                    }
                                                })}
                                                <span className="crypto-name">{name}</span>
                                            </div>
                                        </div>

                                        {props.response.cryptos.sell.map((sellPrice) => {
                                            if (sellPrice.symbol == name) {
                                                sellPriceCounter++
                                                if (sellPriceCounter <= 1) {
                                                    sellPrices = sellPrice.items[0]?.price.toFixed(4) ? sellPrice.items[0]?.price.toFixed(4) : sellPrice.items[0]?.price.toFixed(2)
                                                }
                                            }
                                        })}
                                        <h4 className="crypto-price">${buyPrice} / ${sellPrices}</h4>
                                    </div>
                                    <div className="crypto-markets">
                                        {props.response.cryptos.buy.map((buyPrice) => {
                                            if (buyPrice.symbol == name) {
                                                buyPos++
                                                return (
                                                    <Card
                                                        prices={buyPrice}
                                                        query="buy"
                                                        position={buyPos}
                                                    />
                                                )
                                            }
                                        })}
                                        {props.response.cryptos.sell.map((sellPrice) => {

                                            if (sellPrice.symbol == name) {
                                                sellPos++
                                                return (
                                                    <Card
                                                        prices={sellPrice}
                                                        query="sell"
                                                        position={sellPos}
                                                    />
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h3 style={{ marginTop: "1em" }}>
                        Powered by <span style={{ color: "#1f0971" }}>@crypto-prices-for-Chainalysis</span>
                    </h3>
                </div>
            </div>
        </>
    )
};
