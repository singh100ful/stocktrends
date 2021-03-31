import * as Action from 'src/store/actions/Action';

const Stocks = (
  state = {
    loading: false,
    err: null,
    stocks: [],
  },
  action: any,
) => {
  switch (action.type) {
    case Action.GET_STOCKS:
      return {...state, loading: false, err: null, stocks: action.payload};

    case Action.STOCKS_LOADING:
      return {...state, loading: true, err: null, stocks: []};

    case Action.STOCKS_FAILED:
      return {...state, loading: false, err: action.payload, stocks: []};

    case Action.REMOVE_STOCKS:
      return {...state, loading: false, err: null, stocks: []};

    default:
      return state;
  }
};

export default Stocks;
