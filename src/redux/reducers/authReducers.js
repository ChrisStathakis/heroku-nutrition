import {
    RECEIVE_USER,
    REQUEST_USER,
} from '../action_types';


const userInitialState = {
    isFetching: false,
    tag_username: '',
    age: '',
    weight: 0,
    height: 0,
    tag_gender: '',
    bmi: 0,
    bmr: 0,
    pal: 0,
    total_calories: 0,
    profile_id: '',
    id: '',
};

export function userReducer(state=userInitialState, action) {
    switch (action.type){
        case REQUEST_USER:
            return Object.assign({}, state, {isFetching:true});
        case RECEIVE_USER:
            let new_state = Object.assign({}, state, {isFetching:false});
            return Object.assign({}, new_state, action.respData);
        default:
            return state
    }
}