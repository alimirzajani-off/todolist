export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_TODO_LIST":
      return action.payload;
    default:
      return state;
  }
};
