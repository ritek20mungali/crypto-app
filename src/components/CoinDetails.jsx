import React ,{useState,useEffect} from 'react'
import {Container,Box,HStack,VStack,Image,Heading,Text,Button,Radio,RadioGroup,Stat,StatLabel,StatNumber,StatArrow,StatHelpText,Badge,Progress} from "@chakra-ui/react"
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { server } from '../index';
import axios  from 'axios';
import Error from './Error';
import Chart  from './Chart';

const CoinDetails = () => {

  const [coin,setCoin]=useState({});
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(false);
     const[currency,setCurrency]=useState("inr");
     const[days,setDays]=useState("24h");
     const[chartArray,setChartArray]=useState([]);
     const params=useParams();

      const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$"

      const btn=["24h","7d","14d","30d","60d","200d","365d","max"];

      const switchChartStats=(key)=>{
           switch (key) {
            case "24hr":
               setDays("24h");
               setLoading(true);
              break;

              case "7d":
               setDays("7d");
               setLoading(true);
              break;
              case "14d":
               setDays("14d");
               setLoading(true);
              break;
              case "30d":
               setDays("30d");
               setLoading(true);
              break;
              case "60d":
               setDays("60d");
               setLoading(true);
              break;
              case "200d":
               setDays("200d");
               setLoading(true);
              break;
              case "365d":
               setDays("365d");
               setLoading(true);
              break;

              case "max":
               setDays("max");
               setLoading(true);
              break;
           
            default:
              setDays("24h");
               setLoading(true);
              break;
           }
          }
      

     useEffect(()=>{
        const fetchCoin=async ()=>{

            try {
                const {data} = await axios.get(`${server}/coins/${params.id}`)
               
                const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

              

            setCoin(data);
            setChartArray(chartData)
            setLoading(false);
            // console.log(data);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
            
        }

        fetchCoin();
    },[params.id],currency,days)

    if(error){
        return <Error msg={"ERROR WHILE FETCHING COIN"}/>;
    }

  return (
    <>
      <Container maxW={"container.x1"}>
         {
          loading?<Loader/>:(<>
            <Box borderWidth={1} width={"full"}>
              <Chart days={days} arr={chartArray} currency={currencySymbol}/>
              </Box>
 
              <HStack p={"4"} overflowX={"auto"}>
                {
                btn.map((i)=>(
                   <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
                ))
                 }
              </HStack>
      
             <RadioGroup  value={currency} onChange={setCurrency} p={"5"} ml={"12"}>
        <HStack spacing={"4"}>
            <Radio value={"inr"} >INR</Radio>
            <Radio value={"usd"} >USD</Radio>
            <Radio value={"eur"} >EUR</Radio>
                
        </HStack>
     </RadioGroup>
 
      <VStack spacing={"4"} p={"16"} alignItems={"flex-start"} >
        <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"} >
          Last Updated On {coin.market_data.last_updated.split("G")[0]}
        </Text>

          <Image src={coin.image.large} h={"16"} 
           objectFit={"contain"} w={"16"}/>
      
      <Stat>
        <StatLabel>{coin.name}</StatLabel>
        <StatNumber>{currencySymbol}{ coin.market_data.current_price[currency]}</StatNumber>
        <StatHelpText>
          <StatArrow type={coin.market_data.price_change_percentage_24h>0?"increase":"decrease"}/>
          {coin.market_data.price_change_percentage_24h}
        </StatHelpText>
      </Stat>

      <Badge fontSize={"2x1"} bgColor={"blackAlpha.800"}
      color={"white"}>
        {`#${coin.market_cap_rank}`}
      </Badge>

      <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

      <Box w={"full"} p={"4"} >
        <Item title={"MAX SUPPLY"} val={coin.market_data.max_supply}/>

        <Item title={"CIRCULATING SUPPLY"} val={coin.market_data.circulating_supply}/>

        <Item title={"MARKET CAP"} val={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>

         <Item title={"ALL TIME LOW"} val={`${currencySymbol}${coin.market_data.atl[currency]}`}/>

         <Item title={"ALL TIME HIGH"} val={`${currencySymbol}${coin.market_data.ath[currency]}`}/>

      </Box>

      </VStack>
              
          </>)
         }
      </Container>
    </>
  )
}

const Item =({title,val})=>(
    <HStack justifyContent={"space-between"} w={"full"}
    my={"4"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
      <Text>{val}</Text>
    </HStack>
    
)

const CustomBar=({high,low})=>(
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24hr Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
)

export default CoinDetails