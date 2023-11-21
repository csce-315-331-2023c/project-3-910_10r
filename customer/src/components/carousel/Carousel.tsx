import React, {useState} from 'react'
import "./Carousel.css";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
interface Slide{
    imageName: string;
    alt: string;
}
interface CarouselProps{
    data:{
        slides: Slide[];
    }
}
export const Carousel: React.FC<CarouselProps> = ({data}) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () =>{
        setSlide(slide === data.slides.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.slides.length - 1 : slide - 1);
    };
  return (
    <div className="carousel">
        <BsArrowLeftCircleFill className = "arrow arrow-left" onClick = {prevSlide}/>
        {data.slides.map((item, idx) => {
            return (<img 
                src = {item.imageName}
                alt = {item.alt}
                key = {idx}
                className= {slide === idx ? "slide" : "slide slide-hidden"}
            />);
        })}
        <BsArrowRightCircleFill className = "arrow arrow-right" onClick={nextSlide}/>
        <span className="indicators">
            {data.slides.map((_, idx) => {
                return <button className={slide === idx ? "indicator" : "indicator indicator-inactive"}></button>
            })}
        </span>
    </div>
  );
  
}
