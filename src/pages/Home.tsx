import background from '../assets/images/Dice_Background.jpg'

// TODO Style
function Home() {
  return (
    <div 
      style={{ backgroundImage: `url(${ background })`}} 
      className='flex flex-row justify-center mx-auto bg-cover bg-fixed'
      >
        <div className='flex place-items-center h-screen'>
          <h3 className='p-5 bg-white bg-opacity-50 text-black rounded'>Welcome To the Character Book</h3>
        </div>
    </div>
  )
}

export default Home