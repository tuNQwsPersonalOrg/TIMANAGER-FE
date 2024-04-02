import { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/Global/GlobalContext";
import { GlobalSetPath } from "../contexts/Global/GlobalAction";
import { PathList } from "../constants";
import { getType } from "../utils/TypeUtil";

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
const useSetPath = (paths) => {
    const globalContext = useContext(GlobalContext);

    useEffect(() => {
        if (getType(paths) !== "array")
            return globalContext.dispatch(
                GlobalSetPath([
                    { title: "Home", path: PathList.homePage, level: 1 },
                ]),
            );

        paths.sort((a, b) => a.level - b.level);
        globalContext.dispatch(GlobalSetPath(paths));
        //eslint-disable-next-line
    }, []);
};

export default useSetPath;
