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

export const CarouselMobile = () => {

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
            partialVisible={false}
            responsive={responsive}
            renderButtonGroupOutside={true}
            infinite={true}
            arrows={false}
            transitionDuration={500}
            containerClass="container-padding-top"
            className='w-parent-plus-100 relative right-[50px]'
        >
            <div><ReviewCard name="Sarah M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`} /></div>
            <div><ReviewCard name="John M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations. I really love it!"`} /></div>
            <div><ReviewCard name="Smith M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations. My child love it, and I love it very much"`} /></div>
            <div><ReviewCard name="Kay M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has."`} /></div>
            <div><ReviewCard name="Henry M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`} /></div>
            <div><ReviewCard name="Tom M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`} /></div>
            <div><ReviewCard name="Thomas M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`} /></div>
        </Carousel>


    )
}
