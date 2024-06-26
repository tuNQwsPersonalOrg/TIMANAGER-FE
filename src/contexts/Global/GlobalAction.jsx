export const GlobalActionType = {
    fetchStart: 'FETCH_START',
    fetchEnd: 'FETCH_END',
    setPath: 'SET_PATH',
    setMasterData: 'SET_MASTER_DATA',
    setSelectedDate: 'SET_SELECTED_DATE',
    setSelectedMonth: 'SET_SELECTED_MONTH',
    setTimespan: 'SET_TIMESPAN',
    setCreateTaskForm: 'SET_CREATE_TASK_FORM',
};
export const GlobalLoadingStart = () => ({
    type: GlobalActionType.fetchStart,
});
export const GlobalLoadingEnd = () => ({
    type: GlobalActionType.fetchEnd,
});

/**
 * @typedef {{
 *  title: string,
 *  path: string,
 *  level: number
 * }} Path
 */

/**
 *
 * @param {Array<Path>} paths
 * @returns
 */
export const GlobalSetPath = (paths) => ({
    type: GlobalActionType.setPath,
    payload: paths,
});

export const GlobalSetMasterData = (masterData) => ({
    type: GlobalActionType.setMasterData,
    payload: masterData,
});

export const GlobalSetSelectedDate = (newSelectedDate) => ({
    type: GlobalActionType.setSelectedDate,
    payload: newSelectedDate,
});

export const GlobalSetSelectedMonth = (newSelectedMonth) => ({
    type: GlobalActionType.setSelectedDate,
    payload: newSelectedMonth,
});

export const GlobalSetTimespan = (timespan) => ({
    type: GlobalActionType.setTimespan,
    payload: timespan,
});

export const GlobalSetCreateTaskForm = (taskInfo) => ({
    type: GlobalActionType.setCreateTaskForm,
    payload: taskInfo,
});
