import React, {useState , useEffect} from 'react'
import axios from 'axios';


const App = () => {

  const [searchVal,setSearchVal] = useState('')
  const [data,setData] = useState([])


  const displaySearched = () => {
   //Filter the data array based on the search value
    const filteredData = data.filter(coin => coin.id.includes(searchVal.toLowerCase())); 
  
  // Map over the filtered array and render the elements
    return filteredData.map((coin,idx) => {
      return (
         <div key={idx} className="coin-rows">
        <div className="coin">
          <img className='coin-img' src={coin.image} alt="" />
          <h1 className='coin-id'>{coin.id}</h1>
          <p className='coin-price'>Price: {coin.current_price.toLocaleString()}</p>
          <p className='price-change'>PriceChange: {coin.price_change_percentage_24h.toFixed(2)}%</p>
          <p className='mark-cap'>Market Cap: {coin.market_cap_rank}</p>
          <p className='total-vol'>Total Volume: {coin.total_volume.toLocaleString()}</p>
        </div>
      </div>
      )
    })
  }

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
    .then(res => {
      setData(res.data)
    }).catch(error => console.log(error))
  },[])

  return (
    <div className='app'>
      <div className="input-container">
        <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} type="text" placeholder='Search for a currency' />
      </div>
      <div className="infos-container">
        {searchVal === '' ?
        data.map((coin,idx) => {
        return (
        <div key={idx} className="coin-rows">
          <div className="coin">
            <img className='coin-img' src={coin.image} alt="" />
            <h1 className='coin-id'>{coin.id}</h1>
            <p className='coin-price'>Price: {coin.current_price.toLocaleString()}</p>
            <p className='price-change'>PriceChange: {coin.price_change_percentage_24h.toFixed(2)}%</p>
            <p className='mark-cap'>Market Cap: {coin.market_cap_rank}</p>
            <p className='total-vol'>Total Volume: {coin.total_volume.toLocaleString()}</p>
          </div>
        </div>
          
        )
        }) : 
        (
          displaySearched()
        )
        }
      </div>
    </div>
  )
}

export default App



