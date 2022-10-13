import axios from "axios";
import {axiosAuthConfig, stripePUBLIC_KEY} from "../../app.properties";
import {dispatch, useStoreState} from "../../security/persistenceAuthProvider";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {TextField} from "@mui/material";
import {paymentDTO} from "../DTO/paymentDTO";
import Stripe from "react-stripe-checkout";

const CARD_ELEMENT_OPTIONS = {
    style: {

        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};


export default function PaymentForm(props) {
    const [success, setSuccess] = useState(false)


    const [amount, setAmount] = useState(0)

    let Bearer = useStoreState('authToken');
    let player = useStoreState('user');
    const navigate = useNavigate();


    async function handleToken(token) {

        let paymentt: paymentDTO = {id: token.id, amount: amount}

        await axios.post("http://localhost:8080/payment/", paymentt, axiosAuthConfig(Bearer)).then((response) => {

            console.log("r.data" + response.data)

            if (response.status === 200) {
                console.log("Successful payment")
                setSuccess(true)
                player.balance = Number(player.balance) + Number(amount)   //lol i should hav used TS
                dispatch({
                    user: player,
                    type: 'setUser',
                });
                props.setBalance(player.balance)

            }


        }).catch((error) => {
            console.log(error)

            alert("Your payment didnt go through: " + error.response.data);
        });
    }


    return (
        <>
            {!success ?
                <div>
                    <TextField type={"number"} style={{marginBottom: '5px', minWidth: '350px'}}
                               onChange={(e) => setAmount(e.target.value)} value={amount} id="outlined-basic"
                               label="Amount €" variant="outlined"/>

                    <Stripe style={{minWidth: '350px'}}
                            stripeKey={stripePUBLIC_KEY}
                            token={handleToken}
                    />

                </div>
                :
                <div>
                    <h2 style={{color: "green"}}>You transaction has been processed, {amount}€ have been added to your
                        account</h2>
                </div>
            }

        </>
    )
}