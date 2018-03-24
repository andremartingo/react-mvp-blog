import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state,action.payload.data)
    case FETCH_POST:
      //const post = action.payload.data;
      //const newState = { ...state };
      //newState[post.id] = post;
      //return newState;
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id"); //transform array of objects in array of key:object
    default:
      return state;
  }
}
