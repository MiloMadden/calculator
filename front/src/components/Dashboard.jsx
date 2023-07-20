import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Coin from './Coin';

const Dashboard = () => {

    const [coins, setCoins] = useState([])

    useEffect(()=>{
  
      const fetchCoins = async()=>{
  
        const { data }  = await axios.get("http://localhost:3001/api/get_coins")
  
        console.log(data.coins)
        setCoins(data.coins)
  
      }
  
      fetchCoins()
  
    }, [])

    if(coins.length == 0){
        return(
            <h2>Loading...</h2>
        )
    }else{
        return (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Price in USD</th>
                <th>Rank</th>
                <th>Exchanges</th>
                <th>Markets</th>
                <th>Change</th>
                <th>Invest</th>
              </tr>
            </thead>
            <tbody>

            {
                coins && coins.map((c) => (
                    <Coin key={ c.uuid } coin={ c } />
                ))
            }

            </tbody>
          </Table>
        )        
    }


}

export default Dashboard