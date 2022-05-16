import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Events.scss";
import Event from "./Event";
import { getEventsApi } from "../../../api/denApi";

const Events: React.FC<{ account: string }> = ({ account }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleGetData = useCallback(async () => {
    try {
      setIsFetching(true);
      const { data } = await getEventsApi(account);
      setData([...data]);
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, [account]);

  const refetch = async () => {
    try {
      const { data } = await getEventsApi(account);
      setData([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

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
