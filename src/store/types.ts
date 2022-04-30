export type IContractData = {
  apy: number;
  endTime: string | number | undefined;
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
}

export interface IDenEventParticipants {
  task_id: string;
  account: string;
  username: string;
  createdAt: string;
  _id: string;
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
