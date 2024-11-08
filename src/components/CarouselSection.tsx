import React, { useEffect, useState } from "react";
import leftArrowIcon from "../assets/icons/left-arrow.png";
import rightArrowIcon from "../assets/icons/right-arrow.png";
import { ReviewCard } from "../components/ReviewCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getRandomReview, Review } from "../services/reviewService";

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group flex flex-row-reverse absolute xl:right-24 md:right-12 right-4 md:top-[-85px] -top-11 gap-5">
      <a className="cursor-pointer" onClick={() => next()}>
        <img src={rightArrowIcon} />
      </a>
      <a className="cursor-pointer" onClick={() => previous()}>
        <img src={leftArrowIcon} />
      </a>
    </div>
  );
};

export const CarouselSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReview();
  }, []);

  // async function fetchReview() {
  //     try {
  //         const response = await fetch('https://run.mocky.io/v3/4b2a40e2-6ab6-41e3-999f-0fd70ea1f319');
  //         if (!response.ok) {
  //             throw new Error(`Response status: ${response.status}`)
  //         }
  //         const responseData = await response.json()
  //         setReviews(responseData)
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }
  function fetchReview() {
    setReviews(getRandomReview(10));
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      // partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      customButtonGroup={<ButtonGroup />}
      swipeable={true}
      draggable={true}
      centerMode={true}
      responsive={responsive}
      renderButtonGroupOutside={true}
      infinite={true}
      arrows={false}
      transitionDuration={500}
      containerClass="container-padding-top"
      itemClass="w-full"
      // className='lg:w-parent-plus-100 relative md:right-[50px] md:mb-0'
      className="md:mb-0"
    >
      {reviews.map((r, index) => (
        <ReviewCard key={index} review={r} carousel={true} />
      ))}
    </Carousel>
  );
};
