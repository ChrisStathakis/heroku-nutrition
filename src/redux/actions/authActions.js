import { token, USER_DATA_ENDPOINT } from '../../helpers/endpoints';
import { RECEIVE_USER, REQUEST_USER} from "../action_types";
import { lookupOptionIncludeToken} from "../../helpers/functions_helpers";

function requestUser() {
    return {
        type: REQUEST_USER,
        isFetching: true
    }
}

function receiveUser(respData) {
    return{
        type: RECEIVE_USER,
        respData
    }
}

export function fetchUserData(token) {
    return dispatch => {
        dispatch(requestUser());
        return fetch(USER_DATA_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData=>{
                dispatch(receiveUser(respData))
            })
    }
}

function shouldFetchUserData(state) {
    const {tag_username} = state.userReducer;
    if (tag_username.length < 1){
        return true
    } else if (state.isFetching) {
        return false
    } else {
        return false
    }
}

export function fetchUserDataIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchUserData(getState())) {
            return dispatch(fetchUserData(token))
        }
    }
}

export function fetchLoginUser(token, thisComp) {
    return dispatch => {
        dispatch(requestUser());
        return fetch(USER_DATA_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData=>{
                dispatch(receiveUser(respData))
                thisComp.props.history.push('/')
            })
    }
}