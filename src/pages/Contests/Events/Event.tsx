import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";
import moment from "moment";

import event1 from "../../../assets/images/event1.png";
import { Button } from "../../../components";
import { getUserRewards } from "../../../helpers/eventLeaderboard";
import Task from "./Task";
import { IDenEvents } from "../../../store/types";

interface IEventProps extends IDenEvents {
  refetch: () => Promise<void>;
}

const Event: React.FC<IEventProps> = ({
  event_name,
  image,
  description,
  tasks,
  participants,
  refetch,
  _id,
  createdAt,
  end_date,
}) => {
  const [toggle, setToggle] = useState(1);

  const renderDescription = (
    <div>
      <p className="mb-10">{description}</p>
      <Button onClick={() => setToggle(2)}>View Task</Button>
    </div>
  );

  const renderTasks = (
    <div className="event_tasks_container">
      <h4 className="mb-15">Complete tasks and get rewarded</h4>
      <AnimateSharedLayout>
        <motion.div layout className="event_tasks_wrapper">
          {tasks?.map((task, i) => {
            return (
              <Task
                key={task._id}
                {...task}
                participants={participants}
                refetch={refetch}
                eventId={_id}
              />
            );
          })}
        </motion.div>
      </AnimateSharedLayout>
      <div className="mt-20" data-position="end">
        <Button variant="secondary" onClick={() => setToggle(3)}>
          View Leaderboard
        </Button>
      </div>
    </div>
  );

  const renderLeaderboard = (
    <div>
      <h4 className="mb-15"> Event Leaderboard</h4>
      {!getUserRewards(participants).length ? (
        <div className="no_participants">
          <p>No participants yet</p>
        </div>
      ) : (
        <div className="participants_list">
          <div>
            <p>Wallet address</p>
            <p>Points</p>
          </div>
          {getUserRewards(participants).map(({ address, reward }, index) => (
            <div key={index.toString()} className="participants_list-card">
              <p>{`${address?.slice(0, 6)}...${address?.slice(
                address?.length - 6
              )}`}</p>
              <b>{reward}</b>
            </div>
          ))}
        </div>
      )}
      <div className="mt-20" data-position="end">
        <Button onClick={() => setToggle(2)}>View Task</Button>
      </div>
    </div>
  );

  return (
    <div className="event_container">
      <div className="event_container-image">
        {image ? (
          <img src={image} alt="event abstact" />
        ) : (
          <img src={event1} alt="event abstact" />
        )}
      </div>
      <div className="event_container-content">
        <div className="event_container-content_header mb-15">
          <h3>{event_name}</h3>
          <b>{moment(end_date).format("ll")}</b>
        </div>
        <div>
          {
            {
              1: renderDescription,
              2: renderTasks,
              3: renderLeaderboard,
            }[toggle]
          }
        </div>
      </div>
    </div>
  );
};

export default Event;
