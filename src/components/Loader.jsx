import React from 'react'
import { VStack ,Box,Spinner} from '@chakra-ui/react';

const Loader = () => {
  return (
    <>
    <VStack h="90vh" justifyContent={"center"}>
        <Box transform={"scale(20)"}>
            <Spinner size={"x1"}/>
        </Box>
    </VStack>
    </>
  )
}

export default Loader