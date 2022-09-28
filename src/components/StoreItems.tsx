import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export const StoreItems = ({ id, name, price, imgUrl}: StoreItemProps) => {
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useShoppingCart();
  const quantity = getItemQuantity(id);
  
  return (
   <Card className='mb-5 h-100'>
    <Card.Img
     variant='top'
     src={imgUrl}
     height='200px'
     style={{ objectFit: 'cover' }} />
     <Card.Body 
      className='d-flex flex-column'>
      <Card.Title 
      className='d-flex justify-content-between align-items-baseline mb-4'>
        <span className='fs-2'>{name}</span>
        <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
      </Card.Title>
      { quantity === 0 ? 
      <Button onClick={() => increaseItemQuantity(id)} className='mt-auto'>
        +Add To Cart
      </Button> :
       <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='d-flex justify-content-center aligns-items-center mt-auto' style={{gap: '.5rem'}}>
          <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
          <div className='mx-2'>
            <span className='fs-3'>{quantity}</span> in cart
          </div>
          <Button onClick={() => increaseItemQuantity(id)}>+</Button>
        </div>
        <Button onClick={() => removeItem(id)} variant='danger' className='mt-3'>Remove</Button>
        
       </div> }
     </Card.Body>
   </Card>
  )
}
