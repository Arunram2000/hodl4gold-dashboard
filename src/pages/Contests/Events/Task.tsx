import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import Countdown, { CountdownRenderProps } from "react-countdown";

import twitter from "../../../assets/images/twitter.png";
import discord from "../../../assets/images/discord.png";
import telegram from "../../../assets/images/telegram.png";
import checkIcon from "../../../assets/icons/check.svg";

import { Button } from "../../../components";
import {
  getUserApi,
  verifyDiscordMember,
  verifyFollowingUserApi,
  verifyLikedTweetsApi,
  verifyRetweetsApi,
  verifyTelegramMember,
  verifyTweetsApi,
} from "../../../api/denApi";
import { DenUserContext } from "../../../store/context/DenUserContext";

const MILLISECONDS = 24 * 60 * 60 * 1000;

const getLinkText = (type, ref_id) => {
  if (type === "like" || type === "retweet")
    return `click here to ${type} tweet`;
  if (type === "tweet") return `click here to tweet`;
  if (type === "follow") return `click here to follow @${ref_id}`;
  if (type === "join_discord") return "click here to join discord channel";
  if (type === "join_telegram") return "click here to join telegram channel";
  return "";
};

const getIcon = (media: string) => {
  if (media === "discord") return discord;
  if (media === "telegram") return telegram;
  return twitter;
};

const Task = ({
  title,
  description,
  reward_point,
  task_type,
  media_link,
  _id,
  ref_id,
  refetch,
  participants,
  eventId,
  media,
  repeat_duration,
  repeatable_task,
}) => {
  const { account } = useWeb3React();
  const { setUserData, userData } = useContext(DenUserContext);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [error, setError] = useState("");
  const [isHeParticipated, setIsHeParticipated] = useState(
    participants.find(
      (participant) =>
        participant.task_id === _id &&
        participant.account === account?.toLocaleLowerCase()
    )
  );

  const refetchUserData = async () => {
    try {
      const { data } = await getUserApi({ account });
      setUserData({ ...userData, rewards: data.rewards });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      setLoading(true);
      const { data } = await verifyFollowingUserApi(eventId, {
        task_id: _id,
        account: account,
        username: userData?.username,
        task_username: ref_id,
      });

      if (data.error) {
        setError(data.error.message);
        setTimeout(() => setError(null), 5000);
        return;
      }

      setIsHeParticipated(true);
      setOpenForm(false);
      await refetchUserData();
    } catch (error) {
      console.log(error);
      setError("something went wrong.please try again after sometime");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      setLoading(true);
      const { data } = await verifyLikedTweetsApi(eventId, {
        task_id: _id,
        account: account,
        username: userData?.username,
        tweet_id: ref_id,
      });
      console.log(data);

      if (data.error) {
        setError(data.error.message);
        setTimeout(() => setError(null), 5000);
        return;
      }

      setIsHeParticipated(true);
      setOpenForm(false);
      await refetchUserData();
    } catch (error) {
      console.log(error);
      setError("something went wrong.please try again after sometime");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleRetweet = async () => {
    try {
      setLoading(true);
      const { data } = await verifyRetweetsApi(eventId, {
        task_id: _id,
        account: account,
        username: userData?.username,
        tweet_id: ref_id,
      });

      console.log(data);

      if (data.error) {
        setError(data.error.message);
        setTimeout(() => setError(null), 5000);
        return;
      }

      setIsHeParticipated(true);
      setOpenForm(false);
      await refetchUserData();
    } catch (error) {
      console.log(error);
      setError("something went wrong.please try again after sometime");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleTweet = async () => {
    try {
      setLoading(true);

      const { data } = await verifyTweetsApi(eventId, {
        task_id: _id,
        account: account,
        username: userData?.username,
        task: encodeURIComponent(ref_id),
        duration: repeat_duration,
      });

      console.log(data);

      if (data.error) {
        setError(data.error.message);
        setTimeout(() => setError(null), 5000);
        return;
      }

      await refetch();
      setIsHeParticipated({
        ...isHeParticipated,
        nextAt: new Date(Date.now() + MILLISECONDS / repeat_duration),
      });
      setOpenForm(false);
      await refetchUserData();
    } catch (error) {
      console.log(error);
      setError("something went wrong.please try again after sometime");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinDiscord = async () => {
    try {
      setLoading(true);
      console.log(userData?.discord_username);
      const { data } = await verifyDiscordMember(eventId, {
        task_id: _id,
        account: account,
        username: encodeURIComponent(userData?.discord_username),
      });

      console.log(data);

      if (data.error) {
        setError(data.error.message);
        setTimeout(() => setError(null), 5000);
        return;
      }

      setIsHeParticipated(true);
      setOpenForm(false);
      await refetchUserData();
    } catch (error) {
      console.log(error);
      setError("something went wrong.please try again after sometime");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTelegram = async () => {
    try {
      setLoading(true);
      const { data } = await verifyTelegramMember(eventId, {
        task_id: _id,
        account: account,
        username: userData?.telegram_username,
      });

      if (data.error) {
        setError(data.error.message);
        setTimeout(() => setError(null), 5000);
        return;
      }

      setIsHeParticipated(true);
      setOpenForm(false);
      await refetchUserData();
    } catch (error) {
      console.log(error);
      setError("something went wrong.please try again after sometime");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (type) => {
    if (!userData?.username) {
      setError("username is required");
      return;
    }
    setError(null);
    if (type === "follow") handleFollow();
    if (type === "like") handleLike();
    if (type === "retweet") handleRetweet();
    if (type === "join_discord") handleJoinDiscord();
    if (type === "join_telegram") handleJoinTelegram();
    if (type === "tweet") handleTweet();
  };

  const getMediaName = (mediaValue: string) => {
    if (mediaValue === "discord") return userData?.discord_username;
    if (mediaValue === "telegram") return userData?.telegram_username;
    if (mediaValue === "instagram") return userData?.instagram_username;
    return userData?.username;
  };

  const renderer = ({
    completed,
    hours,
    minutes,
    seconds,
  }: CountdownRenderProps) => {
    if (completed) {
      return <b>+{reward_point} points</b>;
    } else {
      return (
        <b style={{ fontSize: "14px" }}>
          {hours}h : {minutes}m : {seconds}s
        </b>
      );
    }
  };

  const renderTaskHeader = (
    <>
      <div className="task_card-content_left">
        <img src={getIcon(media)} alt="social icon" />
        <div>
          <h5 className="mb-6">{title}</h5>
          <p>{description}</p>
        </div>
      </div>
      <div className="task_card-content_right">
        {!!repeatable_task ? (
          isHeParticipated ? (
            <Countdown date={isHeParticipated.nextAt} renderer={renderer} />
          ) : (
            <b>+{reward_point} points</b>
          )
        ) : isHeParticipated ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={checkIcon} alt="check icon" className="icon mr-10" />
          </div>
        ) : (
          <b>+{reward_point} points</b>
        )}
      </div>
    </>
  );

  const timerRenderer = ({ completed }: CountdownRenderProps) => {
    if (completed) {
      return (
        <motion.div
          layout
          className="task_card-content"
          onClick={() => setOpenForm((f) => !f)}
        >
          {renderTaskHeader}
        </motion.div>
      );
    } else {
      return (
        <motion.div layout className="task_card-content">
          {renderTaskHeader}
        </motion.div>
      );
    }
  };

  return (
    <motion.div layout className="task_card">
      {repeatable_task ? (
        isHeParticipated ? (
          <Countdown date={isHeParticipated.nextAt} renderer={timerRenderer} />
        ) : (
          <motion.div
            layout
            className="task_card-content"
            onClick={() => setOpenForm((f) => !f)}
          >
            {renderTaskHeader}
          </motion.div>
        )
      ) : (
        <motion.div
          layout
          className="task_card-content"
          onClick={isHeParticipated ? undefined : () => setOpenForm((f) => !f)}
        >
          {renderTaskHeader}
        </motion.div>
      )}
      <AnimatePresence>
        {openForm && (
          <motion.div layout className="p-30">
            <div className="task_form_container">
              <div>
                <a href={media_link} target="_blank" rel="noopener noreferrer">
                  {getLinkText(task_type, ref_id)}
                </a>
              </div>
              <div className="block_right">
                <div className="form_input">
                  <input
                    type="text"
                    placeholder={"@username"}
                    value={getMediaName(media)}
                    readOnly
                  />
                  <p className={error ? "error_input active" : "error_input"}>
                    {error ?? ""}
                  </p>
                </div>
                {account && (
                  <Button
                    onClick={() => handleSubmit(task_type)}
                    variant="secondary"
                    disabled={loading}
                  >
                    {loading ? "Loading,,," : "Submit"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Task;
