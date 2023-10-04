import React from 'react'
import {Button,HStack} from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Header = () => {
  return  (<HStack p="3"  shadow={"base"} bgColor={"blackAlpha.900"}>
    <Button variant={"unstyled"} ml={"8"} color={'white'}>
        <Link to="/">Home</Link>
    </Button>

    <Button variant={"unstyled"} ml={"8"} color={'white'}>
        <Link to="/exchanges">Exchanges</Link>
    </Button>

    <Button ml={"8"} variant={"unstyled"} color={'white'}>
        <Link to="/coins">Coins</Link>
    </Button>
  </HStack>)
}

export default Header