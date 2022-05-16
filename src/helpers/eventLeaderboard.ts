export const getUserRewards = (participants: any) => {
  const addresses = [
    ...new Set(participants.map((participant) => participant.account)),
  ];

  const userRewards = addresses.map((address: any) => {
    const singleParticipantData = participants.filter(
      (f) => f.account.toLocaleLowerCase() === address.toLocaleLowerCase()
    );
    const rewardForEvent = singleParticipantData.reduce(
      (acc, participantData) => {
        return acc + participantData.reward_point;
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
