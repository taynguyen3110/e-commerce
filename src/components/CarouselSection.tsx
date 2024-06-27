import React from 'react'
import leftArrowIcon from '../assets/icons/left-arrow.png';
import rightArrowIcon from '../assets/icons/right-arrow.png';
import { ReviewCard } from '../components/ReviewCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const { carouselState: { currentSlide } } = rest;
    return (
        <div className='carousel-button-group flex flex-row-reverse absolute right-12 top-[-85px] gap-5'>
            <a onClick={() => next()}><img src={rightArrowIcon} /></a>
            <a onClick={() => previous()}><img src={leftArrowIcon} /></a>
        </div>

    );
};

export const CarouselSection = () => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };

    return (
        <Carousel
            customButtonGroup={<ButtonGroup />}
            swipeable={true}
            draggable={true}
            centerMode={true}
            // partialVisible={true}
            responsive={responsive}
            renderButtonGroupOutside={true}
            infinite={true}
            arrows={false}
            // customTransition="all .5"
            transitionDuration={500}
            containerClass="container-padding-top"
            className='w-full'
        >
            <div><ReviewCard />1</div>
            <div><ReviewCard />2</div>
            <div><ReviewCard />3</div>
            <div><ReviewCard />4</div>
            <div><ReviewCard />5</div>
            <div><ReviewCard />6</div>
            <div><ReviewCard />7</div>
            <div><ReviewCard />8</div>
            <div><ReviewCard />9</div>
        </Carousel>


    )
}
