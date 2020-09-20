const defaultState = {
  laterBooks: null,
  doneBooks: null,
};
const books = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_LATER_BOOKS":
      return {
        ...state,
        laterBooks: action.books,
      };
    case "UPDATE_DONE_BOOKS":
      return {
        ...state,
        doneBooks: action.books,
      };
    case "CLEAR_BOOKS":
      return {
        ...state,
        laterBooks: null,
        doneBooks: null,
      };
    default:
      return state;
  }
};

export default books;
