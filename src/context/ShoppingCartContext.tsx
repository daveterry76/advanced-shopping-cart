import React, { ReactNode, useState } from 'react';
import { createContext, useContext } from 'react';
import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartContextProps = {
  children: ReactNode
}

type CartItems = {
  id: number
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseItemQuantity: (id: number) => void
  decreaseItemQuantity: (id: number) => void
  removeItem: (id: number) => void
  cartQuantity: number
  cartItems: CartItems[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);


export const ShoppingCartContextProvider = ({ children }: ShoppingCartContextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItems[]>("shopping cart", []);

  const cartQuantity = cartItems.reduce((quantity, item) =>
    item.quantity + quantity, 0
  )


  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => {
    /* If an item can be found in the cartItems array, then return
      the quantity, otherwise return zero as the quantity (I guess) */
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  const increaseItemQuantity = (id: number) => {
    setCartItems(currItems => {
      /* If we cannot find the item with the passed id in the cart,
        then we have to put all the other items in the cart and then
        assign a quantity of one (1) to that id that was passed */
      if(currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        /* Otherwise, we would want to map through the cart items, ... */
        return currItems.map(item => {
          if(item.id === id) {
            /* ... then find that particular item and increment it */
            return {...item, quantity: item.quantity + 1 }
          } else {
            /* ... or just return the item if its id does not match
              the id that was passed */
            return item;
          }
        })
      }
    })
  }

  const decreaseItemQuantity = (id: number) => {
    setCartItems(currItems => {
      /* If we find an item using the passed id and its quantity is 1 (one),
        then return a new array without that item */
      if(currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        /* Otherwise, we would want to map through the cart items, ... */
        return currItems.map(item => {
          if(item.id === id) {
            /* ... then find that particular item and decrement it */
            return {...item, quantity: item.quantity - 1 }
          } else {
            /* ... or just return the item if its id does not match
              the id that was passed */
            return item;
          }
        })
      }
    })
  }

  const removeItem = (id: number) => {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id);
    })
  }

  return (
    <ShoppingCartContext.Provider
     value={{ getItemQuantity,
              increaseItemQuantity,
              decreaseItemQuantity,
              removeItem,
              openCart,
              closeCart,
              cartQuantity,
              cartItems
      }}>
        {children}
        <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
}
