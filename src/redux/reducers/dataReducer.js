
import {
    LIKE_SCREAM,
    UNLIKE_SCREAM,

} from '../types';


const initialState = {
    screams: [],
    scream: {},
    loading: false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload.screamId
            );
            state.screams[index] = action.payload;
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload;
            }
            return {
                ...state
            };
        default:
            return state;
    }
}