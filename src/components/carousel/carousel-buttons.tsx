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
    <Button className='carousel-button' onClick={handleClick} variant="info"><strong>{ buttonText }</strong></Button>
  )
}

export default CarouselButton