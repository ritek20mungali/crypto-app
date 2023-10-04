import React from 'react'
import {Box,Image,Text} from "@chakra-ui/react"
import btcSrc from "../assets/btc.png"
import {motion} from "framer-motion"

const Home = () => {
  return (
    <>
    <Box  display="flex" bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>

    <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"whiteAlpha.800"} mt="16">
          <h1 style={{
            textShadow:"2px 6px 3px white"
          }}><b>CRYPTIC CRYPTO</b></h1>  
        </Text>
        
      <motion.div style={{
        height:"85vh",
        
      }}
      
      animate={{
        translateY:"30px"
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:"reverse"
      }}
      >

<Image w={"100vw"} h={"full"} objectFit={"contain"} filter={"grayscale(1)"} pb="10" mb="10" src={btcSrc}/>
      </motion.div>
        

       
    </Box>
     </>
  )
}

export default Home