import React from 'react'
import "./toOrderButton.scss"
interface Props{
    ToOrderPage: React.Dispatch<React.SetStateAction<boolean>>;
}
function ToOrderButton ({ToOrderPage}: Props){

    const navigateToOrderPage = () => {
        ToOrderPage(true);
    }
  return (
<<<<<<< HEAD
    <button className='menu-to-order-button' onClick={navigateToOrderPage}>Build your drink!</button>
=======
    <button className='menu-to-order-button' onClick={navigateToOrderPage}>Ready to Order?</button>
>>>>>>> 32fb9a7fda9f36c876eb88b339fe0490c2f3e0de
  )
}

export default ToOrderButton