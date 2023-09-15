import React, { useState } from 'react';
import "../styles/Home.css";
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

const SearchBar = () => {

  const [query,setquery]=useState("");

  const handleSearch = () => {

  }

  return (
    <>
      <Input
        type="text"
        placeholder='Type any dish...'
        className='input'
        onChange={(e)=>setquery(e.target.value)}
      />
      <Button
        h={{ base: 'auto', md: '85%' }}
        m={{ base: '5% 0', md: '5%' }}
        size='lg'
        bg={"orange.400"}
        _hover={{ bg: "orange.300" }}
        onClick={handleSearch}
        className='button'
      >
        Search
      </Button>
    </>
  )
}

export default SearchBar