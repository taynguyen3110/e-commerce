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
            items: 1,
            // partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 0
        }
    };

    return (
        <Carousel
            customButtonGroup={<ButtonGroup />}
            swipeable={true}
            draggable={true}
            // centerMode={true}
            partialVisible={false}
            responsive={responsive}
            renderButtonGroupOutside={true}
            infinite={true}
            arrows={false}
            transitionDuration={500}
            containerClass="container-padding-top"
            itemClass='w-full'
            className='md:w-parent-plus-100 md:relative md:right-[50px]'
        >
            <ReviewCard name="Sarah M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`} />
            <ReviewCard name="John M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations. I really love it!"`} />
            <ReviewCard name="Smith M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations. My child love it, and I love it very much"`} />
            <ReviewCard name="Kay M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has."`} />
            <ReviewCard name="Henry M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`} />
            <ReviewCard name="Tom M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`} />
            <ReviewCard name="Thomas M." review={`"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`} />


        </Carousel>


    )
}
