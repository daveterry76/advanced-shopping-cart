import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { StoreItems } from '../components/StoreItems'
import storeItems from '../data/items.json'

export const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row xs={1} md={2} lg={3} className='g-3'>
        {storeItems.map((item) => {
          return ( 
          <Col key={item.id}>
            <StoreItems {...item}/>
          </Col>
        )
        })}
      </Row>
    </>
  )
}
