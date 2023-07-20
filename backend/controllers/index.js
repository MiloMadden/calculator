require('dotenv').config()
const axios = require('axios');
const csvParser = require('csv-parser');

const getCoin = async(id)=>{

    const options = {
        method: 'GET',
        url: `${ process.env.COIN_RANKING_URL }${ id }`,
        params: {
          timePeriod: '24h'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.RAPID_API_HOST
        }
      };

      try {
        
        const response = await axios.request(options);

        //console.log(response.data);

        return response.data.data.coin;

      } catch (error) {
        throw Error(error.message)
      }
          

}

const getCoins = async(req, res)=>{

    try {

          const ether = await getCoin(process.env.ETH_UUID)
          const bitcoin = await getCoin(process.env.BTC_UUID)
          const cardano = await getCoin(process.env.ADA_UUID)

        res.json({
          ok: true, 
          coins: [ether, bitcoin, cardano]
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({ ok: false, error: error.message })
    }

}

const getBalance = async(req, res)=>{

    const { uuid, amount } = req.body
    let profit = 0

    try {

        const coin = await getCoin(uuid)

        if(coin.symbol === "ETH"){
            profit = 4.2;
        } else if( coin.symbol === "BTC"){
            profit = 5;
        } else if( coin.symbol === "ADA" ){
            profit = 1;
        } 

        const monthlyUSD = (amount * profit) / 100
        const annualUSD = monthlyUSD * 12
        const montly = `${ monthlyUSD / coin.price}`
        const annual = `${ montly * 12 }`

        res.json({
            ok: true, 
            monthlyUSD,
            annualUSD,
            montly, 
            annual
        })
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ ok: false, error: error.message })
    }

}

const getCsv = async(req, res)=>{

    const { json } = req.body
    console.log( json )

    const csvData = convertToCSV(json);

    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);

}

const convertToCSV = (jsonData)=>{

  let csvData = '';
  let headers = Object.keys(jsonData)

  csvData += headers.join(',') + '\n';

  let main = Object.values(jsonData)
  csvData += main.join(',') + '\n';

  return csvData;

}

const getJson = async(req, res)=>{

    const { json } = req.body;

    res.setHeader('Content-Disposition', 'attachment; filename=data.json');
    res.setHeader('Content-Type', 'application/json');
  
    res.status(200).json(json);

}

module.exports = {
    getCoins, getBalance, getCsv, getJson
}