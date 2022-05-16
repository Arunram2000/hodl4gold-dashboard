export type IContractData = {
  apy: number;
  endTime: string | number | undefined;
  withdrawFee: number;
  depositFee: number;
};

export interface IPrize {
  title: string;
  description: string;
  image: string;
  reward_point: number;
}

export interface IDenEventTasks {
  title: string;
  description: string;
  reward_point: number;
  ref_id: string;
  media: string;
  media_link: string;
  task_type: "follow" | "like" | "retweet" | "join";
  _id: string;
  repeat_duration: number;
  repeatable_task: boolean;
}

export interface IDenEventParticipants {
  task_id: string;
  account: string;
  username: string;
  createdAt: string;
  _id: string;
  nextAt: string;
}

export interface IDenEvents {
  event_name: string;
  description: string;
  image: string;
  end_date: string;
  tasks: IDenEventTasks[];
  participants: IDenEventParticipants[];
  _id: string;
  createdAt: string;
}

export interface IDenUser {
  __v: number;
  _id: string;
  account: string;
  createdAt: string;
  description: string;
  discord_username: string;
  instagram_username: string;
  telegram_username: string;
  image: string;
  rewards: number;
  updatedAt: string;
  username: string;
}
