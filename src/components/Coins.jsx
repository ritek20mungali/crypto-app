import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import {Container,HStack,VStack,Image,Heading,Text,Button,Radio,RadioGroup} from "@chakra-ui/react";
import Loader from './Loader';
import Error from './Error';
import CoinCard from './CoinCard';



const Coins = () => {

    const [coins,setCoins]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(false);
     const[page,setPage]=useState(1);
     const[currency,setCurrency]=useState("inr");

     const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$"

     const changePage=(page)=>{
            setPage(page);
            setLoading(true);
     }
     
     const btns=new Array(132).fill(1);

    useEffect(()=>{
        const fetchCoins=async ()=>{

            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)

            setCoins(data);
            setLoading(false);
            // console.log(data);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
            
        }

        fetchCoins();
    },[currency,page])

    if(error){
        return <Error msg={"ERROR WHILE FETCHING COINS"}/>;
    }
  return (
    
    <Container maxW={"container.x1"}>
       {loading?<Loader/> : <>

       {/* inr"?"₹":currency==="eur"?"€":"$" */}
     
     <RadioGroup  value={currency} onChange={setCurrency} p={"5"} ml={"12"}>
        <HStack spacing={"4"}>
            <Radio value={"inr"} >INR</Radio>
            <Radio value={"usd"} >USD</Radio>
            <Radio value={"eur"} >EUR</Radio>
                
        </HStack>
     </RadioGroup>

       <HStack wrap={"wrap"} m={"10"} p={"4"} justifyContent={"space-evenly"}>
        {
           
            coins.map((i)=>(
                <div> <CoinCard id={i.id} price={i.current_price} key={i.id} name={i.name} img={i.image} symbol={i.symbol} 
                currencySymbol={currencySymbol}/></div>
            ))
        }
        </HStack>
        
        <HStack m={"1"} w={"full"} overflowX={"auto"} p={"8"}>
            {
                btns.map((item,index)=>(
                    <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1)}>{index+1}</Button>
                ))
            }
        </HStack>
        </>}
    </Container>
  )
}




export default Coins