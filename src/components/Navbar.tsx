import React from 'react'
import { Container, Nav, Navbar as NavbarBS, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

export const Navbar = () => {
    const { openCart, cartQuantity } = useShoppingCart();
  return (
    <>
        <NavbarBS sticky='top' className='bg-white shadow-sm mb-3'>
            <Container>
                <Nav className='me-auto'>
                    <Nav.Link to='/' as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link to='/store' as={NavLink}>
                        Store
                    </Nav.Link>
                    <Nav.Link to='/about' as={NavLink}>
                        About
                    </Nav.Link>
                </Nav>
                {cartQuantity > 0 &&  <Button onClick={() => openCart()} style={{ width: '3rem', height: '3rem', position: 'relative'}} variant='outline-primary' className='rounded-circle'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <div className='rounded-circle bg-danger justify-content-center align-items-center' style={{ width: '1.5rem', height: '1.5rem', color: '#fff', position: 'absolute', left: '1.7rem', top: '1.8rem'}}>
                        {cartQuantity}
                    </div>
                </Button>}
            </Container>
        </NavbarBS>
    </>
  )
}
