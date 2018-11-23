import { UPDATE_VOTE } from "./types";

export const updateVote = params => dispatch => {
    console.log(params);

    dispatch({
        type: UPDATE_VOTE,
        payload: {
            id: params.id,
            voteType: params.voteType
        }
    })
};