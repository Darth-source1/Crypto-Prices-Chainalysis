import React from 'react'

const Card = ({prices, query,position}) => {
    return (
        <div>
            <ul className={query}>
                {prices.items.map((item, index) => (
                    <li key={"btc_" + index}>
                        <div className="market-info">
                            {position == 1 &&
                            <small>Best Market {query} Price</small>}
                            <span>{item.provider}</span>
                        </div>
                        <span>${item.price.toFixed(4)?item.price.toFixed(4):item.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Card