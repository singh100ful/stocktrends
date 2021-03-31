import * as Action from 'src/store/actions/Action';

const Login = (
  state = {
    loading: false,
    err: null,
    login: [],
  },
  action: any,
) => {
  switch (action.type) {
    case Action.ADD_LOGIN:
      return {...state, loading: false, err: null, login: action.payload};

    case Action.LOGIN_LOADING:
      return {...state, loading: true, err: null, login: []};

    case Action.LOGIN_FAILED:
      return {...state, loading: false, err: action.payload, login: []};

    case Action.REMOVE_LOGIN:
      return {...state, loading: false, err: null, login: []};

    default:
      return state;
  }
};

export default Login;
