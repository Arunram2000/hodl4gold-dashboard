import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Prize from "./Prize";

import "./Prize.scss";
import { useGetPrizesQuery } from "../../../store/services/prizesApi";

const Prizes: React.FC = () => {
  const { isFetching, data, isError } = useGetPrizesQuery({});

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
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="events_wrapper">
        <div className="loader">
          <p>!Oops... something went wrong!</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="events_wrapper">
        <div className="loader">
          <p>No Prizes is on live yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prize_wrapper">
      <Slider {...settings}>
        {data?.map((res, index) => {
          return <Prize key={index.toString()} {...res} />;
        })}
      </Slider>
    </div>
  );
};

export default Prizes;
