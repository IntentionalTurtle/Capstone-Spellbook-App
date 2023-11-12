import background from '../assets/images/Dice_Background.jpg'

// TODO Style
function Home() {
  return (
    <>
    
    <div 
      style={{ backgroundImage: `url(${ background })`}} 
      className='flex flex-row justify-center mx-auto bg-cover bg-fixed'
      >
        <div className='flex flex-col h-screen justify-items-start text-center'>
          <h3 className='mt-8 p-5 bg-white bg-opacity-50 text-black rounded'>Welcome To the Character Book</h3>
          <h3 className='mt-1 p-5 bg-white bg-opacity-50 text-black rounded'>Please begin by Logging in at the top right corner</h3>
          <h3 className='mt-1 p-5 bg-white bg-opacity-50 text-black rounded'>Then begin adding spells and feature to your Book</h3>
        </div>
    </div>
    </>
  )
}

export default Home