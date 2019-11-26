const adaptComment = (commentRAW) => ({
  id: commentRAW[`id`],
  user: {
    id: commentRAW[`user`][`id`],
    name: commentRAW[`user`][`name`]
  },
  rating: commentRAW[`rating`],
  comment: commentRAW[`comment`],
  date: new Date(commentRAW[`date`]).valueOf()
});

const adaptComments = (commentsRAW) => commentsRAW.map(adaptComment);
const sortByNewDate = (comments) => comments.sort((a, b) => b.date - a.date);

export default {
  adaptComment,
  adaptComments,
  sortByNewDate
};

