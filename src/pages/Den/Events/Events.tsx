import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Events.scss";
import { useGetEventsQuery } from "../../../store/services/eventsApi";
import Event from "./Event";

const Events: React.FC = () => {
  const { data, isFetching, isError, refetch } = useGetEventsQuery({});

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isFetching) {
    return (
      <div className="events_wrapper">
        <div className="loader">
          <h5>Loading...</h5>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="events_wrapper">
        <div className="loader">
          <h5>!Oops... something went wrong!</h5>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="events_wrapper">
        <div className="loader">
          <h5>No Events on live yet.</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="events_wrapper">
      <Slider {...settings}>
        {data?.map((res, index) => {
          return <Event key={index} {...res} refetch={refetch} />;
        })}
      </Slider>
    </div>
  );
};

export default Events;
