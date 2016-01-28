const basic = (state = {}, action) => {
  if (action.type === 'BASIC') {
    return {
      ...state,
      basic: 'triggered',
    };
  }

  return state;
};

const reducers = {
  basic,
};

export default reducers;
