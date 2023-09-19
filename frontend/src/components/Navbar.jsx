import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png"
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useMediaQuery } from '@chakra-ui/react';
import { ImSearch } from 'react-icons/im';
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBookmarkHeart } from 'react-icons/bs';
import { IoLogInOutline } from 'react-icons/io5';
import "../styles/Navbar.css";
import { Button, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../redux/SearchReducer/Action';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/AuthReducer/Action';
import { clear } from '../redux/SavedReducer/Action';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [sizing] = useMediaQuery('(max-width: 1024px)');
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, username } = useSelector((store) => store.AuthReducer);

  const user = localStorage.getItem("user");

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');

    const handleMediaQueryChange = (event) => {
      setIsOpen(event.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  }

  const handleSaved = () => {
    if (!user) {
      alert("Kindly Login First!");
      navigate("/login", { state: { from: "/favorites" } });
      return;
    }
    navigate("/favorites");
  }

  const handleHomeClick = () => {
    navigate("/");
  }

  const handleSearch = () => {
    dispatch(getRecipes(query));
    navigate("/search");
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clear());
    localStorage.removeItem("user");
  }

  return (
    <div className='nav-container'>
      <div className='navbar'>
        <img src={logo} alt="" onClick={handleHomeClick} />
        <div className='navbar-div' >
          <Input
            type="text"
            placeholder='Type any dish...'
            className='input'
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            h={{ base: 'auto', md: '85%' }}
            size='lg'
            bg={"orange.400"}
            _hover={{ bg: "orange.300" }}
            onClick={handleSearch}
            className='button'
          >
            <span className="search-text">
              Search
            </span>
            <span className="search-icon">
              <ImSearch />
            </span>
          </Button>
        </div>
        {isOpen ? <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<GiHamburgerMenu style={{ width: "40px", height: "70%", border: "none" }} />}
            sx={{ border: "none", backgroundColor: "transparent", marginTop: "15px" }}
          />
          <MenuList sx={{ zIndex: "100", backgroundColor: "orange" }}>
            <MenuItem style={{ border: "none", color: "black", margin: "10px", backgroundColor: "transparent" }}>
              <div onClick={handleSaved} className="btn-div">
                <BsBookmarkHeart />
                <button className='nav-btn' >
                  Saved Recipes</button>
              </div>
            </MenuItem>
            <MenuItem style={{ border: "none", color: "black", margin: "10px", backgroundColor: "transparent" }}>
              {user ? <div onClick={handleLogout} className="btn-div">
                <IoLogInOutline />
                <button className='nav-btn' >Logout</button>
              </div> : <div onClick={handleLogin} className="btn-div">
                <IoLogInOutline />
                <button className='nav-btn' >Login/Signup</button>
              </div>}
            </MenuItem>
          </MenuList>
        </Menu> : null}
        {!isOpen && <div className='btn-container'>
          <div onClick={handleSaved} className="btn-div">
            <BsBookmarkHeart />
            <button className='nav-btn' >
              Saved Recipes</button>
          </div>
          {user ? <div onClick={handleLogout} className="btn-div">
            <IoLogInOutline />
            <button className='nav-btn' >Logout</button>
          </div> : <div onClick={handleLogin} className="btn-div">
            <IoLogInOutline />
            <button className='nav-btn' >Login/Signup</button>
          </div>}

        </div>
        }
      </div>
    </div>
  )
}

export default Navbar