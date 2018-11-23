import { UPDATE_VOTE } from "../actions/types";

const initialState = {
    votedFor: [],
    totalVotes: 0,
    latestVote: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_VOTE:
            return {
                ...state,
                totalVotes: !state.votedFor.includes(action.payload.id) ? state.totalVotes + 1 : state.totalVotes - 1,
                votedFor: !state.votedFor.includes(action.payload.id)
                    ? [...state.votedFor, action.payload.id]
                    : [...state.votedFor.slice(0, state.votedFor.indexOf(action.payload.id)),
                        ...state.votedFor.slice(state.votedFor.indexOf(action.payload.id) + 1)
                    ],
                latestVote: action.payload.id
            };
        default:
            return state;
    }
}