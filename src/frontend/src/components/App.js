import React, { Component } from "react";
import { render } from "react-dom";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      placeholder: "Loading..",
      error: false,
      cryptos: {
        buy: [{
          symbol: "BTC",
          items: [],
        },
        {
          symbol: "ETH",
          items: [],
        }],
        sell: [{
          symbol: "BTC",
          items: [],
        },
        {
          symbol: "ETH",
          items: [],
        }]
      }
    };
  }
  getPrices() {
    fetch("api/prices/")
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      }).then(data => {
        if(data!==null) {
          this.setState(() => {
            return {
              cryptos: data,
              error: false,
              loaded: true
            };
          });
        }
      }).catch(error => {
        return this.setState(() => {
          return { placeholder: "Something went wrong!", error: true };
        });
      });
  }

  componentDidMount() {
    this.getPrices();
    setInterval(() => {
      this.getPrices();
    }, 20000);
  }

  render() {
    return (
      <>
        <div className="App">
            <div className="wrapper">
            <h1>CRYPTO PRICES</h1>
            {!this.state.loaded && <div className="loading">
              {this.state.placeholder}
            </div>
            }
            {this.state.error && <div className="error-alert">
              {this.state.placeholder}
            </div>
            }
            <br/>
              <div className="crypto-list">
                <div className="crypto-item">
                  <div className="card-crypto">
                    <div style={{display: 'flex'}}>
                      <div className="crypto-logo">
                        <img src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png" alt="" />
                      </div>
                      <div className="crypto-info">
                        <span className="crypto-name">Bitcoin</span> 
                        <span className="crypto-sysmol">BTC</span> 
                      </div>
                    </div>
                      <div>
                        <h4 className="crypto-price">${this.state.cryptos.buy[0].items[0]?.price.toFixed(2)} / ${this.state.cryptos.sell[0].items[0]?.price.toFixed(2)}</h4>
                      </div>
                  </div>
                  <div className="crypto-markets">
                  <ul className="buy">
                      {this.state.cryptos.buy[0].items.map((item, index) => (
                        <li key={"btc_"+index}>
                          <div className="market-info">
                            {index===0 && <small>Best Market Buy Price</small>}
                            <span>{item.provider}</span>
                          </div>
                            <span>${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="sell">
                      {this.state.cryptos.sell[0].items.map((item, index) => (
                        <li key={"btc_"+index}>
                          <div className="market-info">
                            {index===0 && <small>Best Market Sell Price</small>}
                            <span>{item.provider}</span>
                          </div>
                            <span>${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="crypto-item">
                  <div className="card-crypto">
                  <div style={{display: 'flex'}}>
                      <div className="crypto-logo">
                        <img src="https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png" alt="" />
                      </div>
                      <div className="crypto-info">
                        <span className="crypto-name">Ethereum</span> 
                        <span className="crypto-sysmol">ETH</span>
                      </div>
                    </div>
                      <div>
                        <h4 className="crypto-price">${this.state.cryptos.buy[1].items[0]?.price.toFixed(2)} / ${this.state.cryptos.sell[1].items[0]?.price.toFixed(2)}</h4>
                      </div>
                  </div>
                  <div className="crypto-markets">
                  <ul className="buy">
                      {this.state.cryptos.buy[1].items.map((item, index) => (
                        <li key={"eth_"+index}>
                          <div className="market-info">
                            {index===0 && <small>Best Market Buy Price</small>}
                            <span>{item.provider}</span>
                          </div>
                            <span>${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="sell">
                      {this.state.cryptos.sell[1].items.map((item, index) => (
                        <li key={"eth_"+index}>
                          <div className="market-info">
                            {index===0 && <small>Best Market Sell Price</small>}
                            <span>{item.provider}</span>
                          </div>
                            <span>${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <h3 style={{marginTop: "1em"}}>
                Powered by <span style={{color: "#1f0971"}}>@crypto-prices</span></h3>
            </div>
        </div>
      </>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
