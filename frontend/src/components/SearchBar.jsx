import React, { useState } from 'react';
import "../styles/Home.css";
import { Button, Input } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../redux/SearchReducer/Action';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSearch = () => {
    dispatch(getRecipes(query));
    navigate("/search");
  };

  return (
    <>
      <Input
        type="text"
        placeholder='Type any dish...'
        className='input'
        onChange={(e)=>setQuery(e.target.value)}
      />
      <Button
        h={{ base: 'auto', md: '85%' }}
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