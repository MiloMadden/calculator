import Button from 'react-bootstrap/Button';
import Calculate from './Calculate';
import { Image } from 'react-bootstrap';

import { useState } from 'react';

const Coin = ({ coin }) => {

    const [show, setShow] = useState(false)

    const handleClose = ()=>{
        setShow(false)
    }

    const handleShow = ()=>{
        setShow(true)
    }
    
    return (
        <tr>
            <td>
                <Image 
                    roundedCircle
                    fluid
                    src={ coin.iconUrl }
                />
            </td>
            <td>{ coin.symbol }</td>
            <td>{ coin.name }</td>
            <td>{ coin.price }</td>
            <td>{ coin.rank }</td>
            <td>{ coin.numberOfExchanges }</td>
            <td>{ coin.numberOfMarkets }</td>
            <td>{ coin.change }</td>
            <td>
                <Button onClick={ handleShow }>Calculate</Button>
            </td>
            <Calculate show={ show } handleClose={ handleClose } coin={ coin } />
        </tr>
    )
}

export default Coin