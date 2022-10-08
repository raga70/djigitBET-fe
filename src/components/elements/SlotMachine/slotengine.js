import './slotengine.css';

import React, {useState, useEffect} from 'react'
import {LocalGasStation, OilBarrel, Savings} from "@mui/icons-material";
import {generateNumbers} from "./api";
import {dispatch, useStoreState} from "../../../security/persistenceAuthProvider";
import {SlotCalculationsDTO} from "../../DTO/SlotCalculationsDTO";
import {useNavigate} from "react-router-dom";
import userResponceDTO from "../../DTO/UserResponceDTO";
import PlayerResponceDTO from "../../DTO/PlayerResponceDTO";



const SlotMachine = ({id, owned, close, expires}) => {
    let Bearer = useStoreState('authToken');
    let player = useStoreState('user');
    const navigate = useNavigate();
    const [spin, setSpin] = useState(false)
    const [ring1, setRing1] = useState()
    const [ring2, setRing2] = useState()
    const [ring3, setRing3] = useState()
    const [price, setPrice] = useState()
    const [betAmount, setBetAmount] = useState(0)
    const [realBet, setRealBet] = useState(0)
    const [jackpot, setJackpot] = useState(0)
    const [balance, setBalance] = useState(player.balance)
    const [errorMsg, SetErrorMsg] = useState("")

    useEffect(() => {
        win()
    }, [ring3])


    function row1() {

        if (!spin) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd"><OilBarrel  fontSize={"100px"}/></div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        } else if (spin && ring1 == undefined) {
            return (
                <>
                    <div className="ringMoving">🍓</div>
                    <div className="ringMoving">🍇</div>
                    <div className="ringMoving">🍊</div>
                    <div className="ringMoving">🥭</div>
                </>
            )
        } else if (ring1 >= 1 && ring1 <= 30 ) {
            return (
                <>
                    <div className="ringEnd">🍍</div>
                    <div className="ringEnd">🍒</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        }else if (ring1 > 30 && ring1 <= 50 ) {
            return (
                <>
                    <div className="ringEnd">🍍</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        }else if (ring1 > 50 && ring1 <= 75) {
            return (
                <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                </>
            )
        }else if (ring1 > 75 && ring1 <= 95) {
            return (
                <>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                </>
            )
        } else if (ring1 > 95 && ring1 <= 100) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        }
    }

    function row2() {

        if (!spin) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd"><LocalGasStation fontSize={"100px"}/></div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        } else if (spin && ring2 == undefined) {
            return (
                <>
                    <div className="ringMoving">🍓</div>
                    <div className="ringMoving">🍇</div>
                    <div className="ringMoving">🍊</div>
                    <div className="ringMoving">🥭</div>
                </>
            )
        } else if (ring2 >= 1 && ring2 <= 30 ) {
            return (
                <>
                    <div className="ringEnd">🍉</div>
                    <div className="ringEnd">🍒</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        }else if (ring2 > 30 && ring2 <= 50 ) {
            return (
                <>
                    <div className="ringEnd">🍉</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        }else if (ring2 > 50 && ring2 <= 75) {
            return (
                <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                </>
            )
        }else if (ring2 > 75 && ring2 <= 95) {
            return (
                <>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                </>
            )
        } else if (ring2 > 95 && ring2 <= 100) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        }

    }

    function row3() {

        if (!spin) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd"><OilBarrel  fontSize={"100px"}/></div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        } else if (spin && ring3 == undefined) {
            return (
                <>
                    <div className="ringMoving">🍓</div>
                    <div className="ringMoving">🍇</div>
                    <div className="ringMoving">🍊</div>
                    <div className="ringMoving">🍋</div>
                    <div className="ringMoving">🍍</div>
                    <div className="ringMoving">🥭</div>
                </>
            )
        } else if (ring3 >= 1 && ring3 <= 30 ) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍒</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        }else if (ring3 > 30 && ring3 <= 50 ) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        } else if (ring3 > 50 && ring3 <= 75) {
            return (
                <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                </>
            )
        } else if (ring3 > 75 && ring3 <= 95) {
            return (
                <>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                </>
            )
        } else if (ring3 > 95 && ring3 <= 100) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        }
    }
    //
    // function win() {
    //     if (ring1 <= 50 && ring2 <= 50 && ring3 <= 50 && ring1 != undefined) {
    //         setPrice(1)
    //     } else if (ring1 > 50 && ring1 <= 75 && ring2 > 50 && ring2 <= 75 && ring3 > 50 && ring3 <= 75 && ring1 != undefined) {
    //         setPrice(2)
    //     } else if (ring1 > 75 && ring1 <= 95 && ring2 > 75 && ring2 <= 95 && ring3 > 75 && ring3 <= 95 && ring1 != undefined) {
    //         setPrice(3)
    //     } else if (ring1 > 95 && ring1 <= 100 && ring2 > 95 && ring2 <= 100 && ring3 > 95 && ring3 <= 100 && ring1 != undefined) {
    //         setPrice(4)
    //     } else {
    //         setPrice(0)
    //     }
    // }

    // function rand() {
    //     setRing1(Math.floor(Math.random() * (100 - 1) + 1))
    //     setTimeout(function(){setRing2(Math.floor(Math.random() * (100 - 1) + 1))}, 250)
    //     setTimeout(function(){setRing3(Math.floor(Math.random() * (100 - 1) + 1))}, 750)
    // }


    async function rand() {     //fetch
         let response = await generateNumbers(betAmount,Bearer)
            if (response.status !== 200) {
                setRing1(10)
                setRing2(40)
                setRing3(70)
                SetErrorMsg(response.data)
                if (response.status === 401) navigate('/login');
                return;
            }
            
            let data : SlotCalculationsDTO =  response.data;
            setRing1(data.ring1)
            setRing2(data.ring2)
            setRing3(data.ring3)
             // setTimeout(function(){setRing2(data.ring2)}, 250)
             // setTimeout(function(){setRing3(data.ring3)}, 750)
            setJackpot(data.jackpot);
            setBalance(data.balance);
            player.balance = data.balance;
            dispatch({
                user: player,
                type: 'setUser',
            });
            console.log(data)
        
        
    }

    async function play() {
        SetErrorMsg("")
        if (ring3 > 1 || !spin){
            if (betAmount <= balance && betAmount >= 1){
                setRealBet(betAmount)
                setSpin(true)
                setRing1()
                setRing2()
                setRing3()
                // setBalance(balance - betAmount)
                // setJackpot(jackpot + (betAmount / 2))
                setTimeout(async function(){
                    await rand()
                }, 1000)
            } else {
                setPrice(10)
            }

        }
    }


    function win() {
         if (ring1  <= 30 && ring2 <= 30 && ring3 <= 30 && ring1 != undefined) {
            setPrice(5)
            
        }else if (ring1 > 30 && ring1 <= 50 && ring2 > 30 && ring2 <= 50 && ring3 > 30 && ring3 <= 50 && ring1 != undefined) {
             setPrice(1)

         }else if (ring1 > 50 && ring1 <= 75 && ring2 > 50 && ring2 <= 75 && ring3 > 50 && ring3 <= 75 && ring1 != undefined) {
            setPrice(2)
           
        } else if (ring1 > 75 && ring1 <= 95 && ring2 > 75 && ring2 <= 95 && ring3 > 75 && ring3 <= 95 && ring1 != undefined) {
            setPrice(3)
            setBalance(balance + (betAmount * 25))
        } else if (ring1 > 95 && ring1 <= 100 && ring2 > 95 && ring2 <= 100 && ring3 > 95 && ring3 <= 100 && ring1 != undefined) {
            setPrice(4)
            
           
        } else {
            setPrice(0)
        }
    }

    function premio() {
        if (errorMsg != ""){
            return (
                <p className="priceInd">{errorMsg}</p>
            )
        }
        else if (price === 1 && ring3 > 1) {
            return (
                <p className="priceInd">{" X15 You've won " + (realBet * 15) + "€!"}</p>
            )
        } else if (price === 2 && ring3 > 1) {
            return (
                <p className="priceInd">{" X20 You've won " + (realBet * 20) + "€!"}</p>
            )
        } else if (price === 3 && ring3 > 1) {
            return (
                <p className="priceInd">{" X25 You've won " + (realBet * 25) + "€!"}</p>
            )
        } else if (price === 4 && ring3 > 1) {
            return (
                <p className="priceInd">{" Jackpot! You've won: " + (jackpot.toFixed(2)) + "€!"}</p>
            )
        }else if (price === 5 && ring3 >1){
           return( <p className="priceInd">{" X5 You've won " + (realBet * 5) + "€!"}</p>)
        }else if (price === 0 && ring3 > 1) {
            return (
                <p className="priceInd">.....</p>
            )
        } else if (price === 10) {
            return (
                <p className="priceInd"> <span style={{color: `red`}}>Not enough funds</span> </p>
            )
        }
    }

    function numChecker(e) {
        const value = e.target.value;
        const regex = /^[0-9]+$/;
        if (value.match(regex) && parseInt(value) >= 0 || value === "") {
            setBetAmount(value);
        }
    }






    return (
        <div className="fullSlot">
            
            <h1 className="price">{"Jackpot: " + jackpot.toFixed(2) + "€"}</h1>
            <div className="slot">
                <div className="row">
                    {row1()}
                </div>
                <div className="row">
                    {row2()}
                </div>
                <div className="row">
                    {row3()}
                </div>
            </div>
            <h1 className="price">
                {premio()}
            </h1>
            <div className="slotFoot">
                <input value={betAmount} type="number" onChange={(e) => numChecker(e)} className="betInput" placeholder="0€"></input>
                <button className="spinButton" onClick={() => play()}>Spin</button>
            </div>
            <h1 className="price">{"Available cash: " + balance + "€"}</h1>
           
        </div>

    )
}

export default SlotMachine;
