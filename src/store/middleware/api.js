import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onError, onStart } = action.payload;

  if (onStart) dispatch({ type: onStart});

  next(action);

  try {
    const response = await axios.request({
      baseURL: `https://expense-tracker-node.herokuapp.com`,
      url,
      method,
      data: method === 'delete' ? { id: data } : { ...data }
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch(error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
}

export default api;