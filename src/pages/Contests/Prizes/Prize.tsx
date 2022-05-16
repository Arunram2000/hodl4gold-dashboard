import React from "react";
import { IPrize } from "../../../store/types";

interface PrizeProps extends IPrize {}

const Prize: React.FC<PrizeProps> = ({
  title,
  description,
  image,
  reward_point,
}) => {
  return (
    <div className="event_container">
      <div className="event_container-image">
        <img src={image} alt="event abstact" />
      </div>
      <div className="event_container-content">
        <div className="event_container-content mb-15">
          <h3>{title}</h3>
          <p className="mb-10 mt-10">{description}</p>
          <div className="flex" style={{ justifyContent: "flex-end" }}>
            <b>
              Value: {reward_point} Points
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prize;
