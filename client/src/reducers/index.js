const defaultState = {
  laterBooks: null,
  doneBooks: null,
  needToAuthorize: false,
};
const books = (state = defaultState, action) => {
  switch (action.type) {
    case "TOGGLE_NEED_TO_AUTHORIZE":
      return {
        ...state,
        needToAuthorize: !state.needToAuthorize,
      };
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
