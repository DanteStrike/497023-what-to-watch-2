const URL_FIX = `http://htmlacademy-react-2.appspot.com`;

const adaptUserProfile = (userProfileRAW) => ({
  id: userProfileRAW[`id`] || null,
  email: userProfileRAW[`email`],
  name: userProfileRAW[`name`],
  avatarUrl: URL_FIX + userProfileRAW[`avatar_url`]
});

const getIDsList = (myListFilmsRAW) => {
  return myListFilmsRAW.reduce((IDsList, filmRAW) => {
    IDsList.push(filmRAW[`id`]);
    return IDsList;
  }, []);
};

export default {
  adaptUserProfile,
  getIDsList
};
