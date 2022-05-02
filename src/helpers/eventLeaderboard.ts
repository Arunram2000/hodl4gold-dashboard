export const getUserRewards = (participants: any, tasks: any) => {
  const addresses = [
    ...new Set(participants.map((participant) => participant.account)),
  ];

  const userRewards = addresses.map((address: any) => {
    const singleParticipantData = participants.filter(
      (f) => f.account.toLocaleLowerCase() === address.toLocaleLowerCase()
    );
    const rewardForEvent = singleParticipantData.reduce(
      (acc, participantData) => {
        const taskData = tasks.find(
          (task) => task._id.toString() === participantData.task_id
        );
        const reward = taskData ? taskData.reward_point : 0;
        return acc + reward;
      },
      0
    );

    return {
      address,
      reward: rewardForEvent,
    };
  });

  const ascendingPlaces = userRewards.sort((a, b) => b.reward - a.reward);

  return ascendingPlaces;
};
