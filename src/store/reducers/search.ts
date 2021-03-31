import * as Action from 'src/store/actions/Action';

const Search = (
  state = {
    loading: false,
    err: null,
    search: [],
  },
  action: any,
) => {
  switch (action.type) {
    case Action.GET_SEARCH:
      return {...state, loading: false, err: null, search: action.payload};

    case Action.SEARCH_LOADING:
      return {...state, loading: true, err: null, search: []};

    case Action.SEARCH_FAILED:
      return {...state, loading: false, err: action.payload, search: []};

    case Action.REMOVE_SEARCH:
      return {...state, loading: false, err: null, search: []};

    default:
      return state;
  }
};

export default Search;
