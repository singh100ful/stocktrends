import {API, baseUrl} from 'src/shared/config';
import * as Action from 'src/store/actions/Action';

export const getStocks = (data?: any) => (dispatch: any) => {
  dispatch(Loading(true));
  return fetch(
    baseUrl + data.type + '&symbol=' + data.symbol + '&apikey=' + API,
    {method: 'get'},
  )
    .catch(err => {
      dispatch(Failed(err));
    })
    .then((response: any) => response.json())
    .then(stocks => {
      let result;

      if (data.type === 'TIME_SERIES_DAILY') {
        const res = stocks['Time Series (Daily)'];
        result = Object.keys(res).map(obj => {
          const date = new Date(obj).getTime();
          return {x: date, y: parseFloat(res[obj]['1. open'])};
        });
      } else if (data.type === 'TIME_SERIES_WEEKLY') {
        const res = stocks['Weekly Time Series'];
        result = Object.keys(res).map(obj => {
          const date = new Date(obj).getTime();
          return {x: date, y: parseFloat(res[obj]['1. open'])};
        });
      } else if (data.type === 'TIME_SERIES_MONTHLY') {
        const res = stocks['Monthly Time Series'];
        result = Object.keys(res).map(obj => {
          const date = new Date(obj).getTime();
          return {x: date, y: parseFloat(res[obj]['1. open'])};
        });
      }

      dispatch(Get(result));
    });
};

export const Loading = (loading: boolean) => ({
  type: Action.STOCKS_LOADING,
  payload: loading,
});

export const Failed = (err: any) => ({
  type: Action.STOCKS_FAILED,
  payload: err,
});

export const Get = (stocks: any) => ({
  type: Action.GET_STOCKS,
  payload: stocks,
});

export const Delete = () => ({
  type: Action.REMOVE_STOCKS,
  payload: [],
});
