// import {get} from 'lodash';

const INITIAL_STATE = {
  refrashe: true,
  loading: false,
  sale_type: [],
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default:
      return state;
  }
};
export default reducers;
