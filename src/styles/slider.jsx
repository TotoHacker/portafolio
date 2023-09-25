import '../styles/slider.css'
import { motion } from 'framer-motion'
import { Carousel } from 'flowbite';

const carousel = new Carousel(items, options);

const slider = () => {
    return (
        <motion.div className='slider-container'>
            {image.map(image =>(
                <img src={image} alt=""></img>
            ))}
            </motion.div>
)
    
        
    
}  
  


