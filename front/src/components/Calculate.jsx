import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';


const Calculate = ({ show, handleClose, coin }) => {

    const [amount, setAmount] = useState(0)
    const [calculation, setCalculation] = useState(null)

    const datos = {
        uuid: coin.uuid, 
        amount
    }

    const calculateProfit = async()=>{
        const { data }  = await axios.post("https://calculator-pied-three-52.vercel.app/api/get_balance", datos)

        console.log(data)
        setCalculation(data)
    }

    const close = ()=>{
        setAmount(0)
        setCalculation(null)
        handleClose()
    }

    const downloadCsv = async(obj)=>{

        const { data } = await axios.post("https://calculator-pied-three-52.vercel.app/api/csv", { json: obj }, {
            responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        
        console.log(data)

    }

    const downloadJson = async(obj)=>{
        const { data } = await axios.post("https://calculator-pied-three-52.vercel.app/api/json", { json: obj }, {
            responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.json');
        document.body.appendChild(link);
        link.click();
    }


    return (
        <Modal show={show} onHide={ close }>
            <Modal.Header closeButton>
            <Modal.Title>{ coin.name }</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Amount</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Amount in US Dollars" 
                    onChange={ (e)=> setAmount(e.target.value) }
                    value={ amount }
                />
            </Form.Group>

            {
                calculation && (
                    <Card>
                        <Card.Body>
                            <Card.Title>Annual in USD</Card.Title>
                            <Card.Text>
                                $ { calculation.annualUSD }
                            </Card.Text>
                            <Card.Title>Annual in { coin.name }</Card.Title>
                            <Card.Text>
                                { calculation.annual }
                            </Card.Text>
                            <Card.Title>Monthly in USD</Card.Title>
                            <Card.Text>
                                $ { calculation.monthlyUSD }
                            </Card.Text>
                            <Card.Title>Monthly in { coin.name }</Card.Title>
                            <Card.Text>
                                { calculation.montly }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            }

            </Modal.Body>
            <Modal.Footer>

                <Button variant="secondary" onClick={ close }>
                    Close
                </Button>
                {
                    calculation ? (
                        <div>
                            <Button variant="success" className='mx-2' onClick={ ()=> downloadCsv({
                                cryptoCurr: coin.name, 
                                amountToInvest: amount, 
                                annualReturnInUSD: calculation.annualUSD, 
                                annualReturn: calculation.annual, 
                                monthlyReturnInUSD: calculation.monthlyUSD, 
                                monthly: calculation.montly
                            }) }>
                                Download CSV
                            </Button>        
                            <Button variant="primary" onClick={ ()=> downloadJson({
                                cryptoCurr: coin.name, 
                                amountToInvest: amount, 
                                annualReturnInUSD: calculation.annualUSD, 
                                annualReturn: calculation.annual, 
                                monthlyReturnInUSD: calculation.monthlyUSD, 
                                monthly: calculation.montly
                            }) }>
                                Download JSON
                            </Button>                       
                        </div>

                    ) : (
                        <Button variant="primary" onClick={ calculateProfit }>
                            Calculate
                        </Button>                        
                            )
                }

            </Modal.Footer>
        </Modal>
    )
}

export default Calculate