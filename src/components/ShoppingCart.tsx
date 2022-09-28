import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { CartItems } from './CartItems'
import storeItem from '../data/items.json'
import { formatCurrency } from '../utilities/formatCurrency'

type ShoppingCart = {
  isOpen: boolean
}

export const ShoppingCart = ({ isOpen }: ShoppingCart) => {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={() => closeCart()} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map(item => 
              <CartItems key={item.id} {...item} />
            )}
          </Stack>
          <div className='ms-auto mt-3 d-flex justify-content-end'>
            <h2>Total: {formatCurrency(cartItems.reduce((total, cartItem) => {
              const item = storeItem.find((i) => i.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.quantity; 
            }, 0))} </h2>
          </div>
        </Offcanvas.Body>
    </Offcanvas>
  )
}
