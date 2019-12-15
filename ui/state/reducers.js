export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userInfo: action.payload,
      };

    case 'SET_ZIP':
      return {
        ...state,
        zip: action.payload,
      };
  }
};
