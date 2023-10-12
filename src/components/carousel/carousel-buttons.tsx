import React from 'react'
import Button from 'react-bootstrap/Button'

interface CarouselButtonProps { 
    buttonText: string;
 }
 
 function CarouselButton({ buttonText }: CarouselButtonProps ) {
    // The function to purchase product displayed, this should be modified later for versatility
    const handleClick = () => {
        console.log("No product")
    }

    // We need to make this also more versatile
  return (
    <Button variant="info"><strong>{ buttonText }</strong></Button>
  )
}

export default CarouselButton