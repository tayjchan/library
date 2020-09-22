export const updateLaterBooks = (books) => ({
  type: "UPDATE_LATER_BOOKS",
  books,
});

export const updateDoneBooks = (books) => {
  return {
    type: "UPDATE_DONE_BOOKS",
    books,
  };
};

export const clearAllBooks = () => {
  return {
    type: "CLEAR_BOOKS",
  };
};

export const toggleNeedToAuthorize = () => {
  return {
    type: "TOGGLE_NEED_TO_AUTHORIZE",
  };
};
