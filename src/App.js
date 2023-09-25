
import './App.css';
import Dashboard from './componentes/Desboart';
import {data} from './mockdata'

function App() {
  return (
    <>
    <Dashboard/>
    
    <img className= 'w-full h-[440px] object-cover' src='https://cdn.pixabay.com/photo/2014/12/16/16/07/ice-570500_640.jpg' alt=""></img>
   <div className='relative flex items-center'>
    <div id='slider' className='w-full overflow-scroll scroll whitespace-nowrap scroll-smoothn'>
    {data.map((item)=>(
<img className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300' src={item.img} alt='/'></img>
))}
    </div>

   </div>
    </>
  );
}


export default App;
