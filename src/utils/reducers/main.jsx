// import {get} from 'lodash';

const INITIAL_STATE = {
  refrashe: true,
  loading: false,
  sale_type: [],
  is_active: true,
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "IS_ACTIVE": {
      return {
        ...state,
        is_active: action?.payload,
      };
    }
    default:
      return state;
  }
};
export default reducers;
