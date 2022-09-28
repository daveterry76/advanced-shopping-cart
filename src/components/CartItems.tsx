import React from 'react'
import { Stack, Button } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeItems from '../data/items.json'
import { formatCurrency } from '../utilities/formatCurrency'

type CartItemsProps = {
    id: number
    quantity: number
}

export const CartItems = ({ id, quantity }: CartItemsProps) => {
    const { removeItem, cartItems } = useShoppingCart();
    const item = storeItems.find(i => i.id == id)

    if(item == null) return null;

  return (
    <Stack direction='horizontal' gap={5} className='mb-3 d-flex justify-content-between align-items-center'>
        <div className='d-flex'>
            <img src={item.imgUrl} style={{width: "7.25rem", height: "6.75rem", objectFit: "cover"}}/>
            <div className='text-muted ms-2 d-flex flex-column justify-content-center'>
                <h3 style={{fontSize: '1.1rem'}}>{item.name} <span style={{fontSize: '0.8rem'}}>x{quantity}</span></h3> 
                <p>{formatCurrency(item.price)}</p>
            </div>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
            <h4 className='fs-6 text-muted me-2'>{formatCurrency(item.price * quantity)}</h4>
            <Button onClick={() => removeItem(id)} variant='danger'>&times;</Button>
        </div>
    </Stack>
  )
}
