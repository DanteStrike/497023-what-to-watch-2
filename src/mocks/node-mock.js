export const createNodeMock = (element) => {
  if (element.type === `video`) {
    return {
      src: null,
      isMuted: null,
      poster: null,
      addEventListener: () => {}
    };
  }
  return null;
};
