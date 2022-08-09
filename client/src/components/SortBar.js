import React from 'react'
import {Button} from 'react-bootstrap'

const SortBar = () => {

  return (
    <div className='sortBar'>
      <Button disabled className='btn sortBtn'>Sort by Author</Button>
      <Button disabled className='btn sortBtn'>Sort by Title</Button>
      <Button disabled className='btn sortBtn'>Sort by Subject</Button>
      <Button disabled className='btn sortBtn'>Sort by Categories</Button>
    </div>
  )
}

export default SortBar