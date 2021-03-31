import {API, baseUrl} from 'src/shared/config';
import * as Action from 'src/store/actions/Action';

export const getSearch = (data?: any) => (dispatch: any) => {
  dispatch(Loading(true));
  return fetch(baseUrl + 'SYMBOL_SEARCH&keywords=' + data + '&apikey=' + API, {
    method: 'get',
  })
    .catch(err => {
      dispatch(Failed(err));
    })
    .then((response: any) => response.json())
    .then(search => {
      dispatch(Get(search.bestMatches));
    });
};

export const Loading = (loading: boolean) => ({
  type: Action.SEARCH_LOADING,
  payload: loading,
});

export const Failed = (err: any) => ({
  type: Action.SEARCH_FAILED,
  payload: err,
});

export const Get = (search: any) => ({
  type: Action.GET_SEARCH,
  payload: search,
});

export const Delete = () => ({
  type: Action.REMOVE_SEARCH,
  payload: [],
});
