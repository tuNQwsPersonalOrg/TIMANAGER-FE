import { GlobalActionType } from './GlobalAction';

export default function GlobalReducer(state, action) {
    switch (action.type) {
        case GlobalActionType.fetchStart:
            return {
                ...state,
                isFetching: true,
            };
        case GlobalActionType.fetchEnd:
            return {
                ...state,
                isFetching: false,
            };
        case GlobalActionType.setPath:
            return {
                ...state,
                paths: action.payload,
            };
        case GlobalActionType.setMasterData:
            return {
                ...state,
                masterData: action.payload,
            };
        case GlobalActionType.setSelectedDate:
            return {
                ...state,
                selectedDate: action.payload,
            };
        case GlobalActionType.setSelectedMonth:
            return {
                ...state,
                selectedMonth: action.payload,
            };
        case GlobalActionType.setTimespan:
            return {
                ...state,
                timespan: action.payload,
            };
        case GlobalActionType.setCreateTaskForm:
            return {
                ...state,
                createTaskForm: action.payload,
            };
        default:
            return state;
    }
}
