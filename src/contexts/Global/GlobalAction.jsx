export const GlobalActionType = {
    fetchStart: 'FETCH_START',
    fetchEnd: 'FETCH_END',
    setPath: 'SET_PATH',
    setMasterData: 'SET_MASTER_DATA',
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
