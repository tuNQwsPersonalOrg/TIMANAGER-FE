import React from 'react';
import { Outlet } from 'react-router-dom';
// import PopupComponent from "../Popup/PopupComponent";
// import LoaderComponent from "../Loader/LoaderComponent";
// import { parseNotNullNumber } from "../../utils/NumberUtils";

const BodyComponent = () => {
    // const [pageNumber, setPageNumber] = useState(parseNotNullNumber(page));
    // const [pageSizeNumber, setPageSizeNumber] = useState(
    //     parseNotNullNumber(pageSize),
    // );
    // useEffect(() => {
    //     if (pageNumber <= 0) {
    //         setSearchParams((prevParams) => {
    //             prevParams.set("page", 1);
    //             return prevParams;
    //         });
    //         setPageNumber(1);
    //     }
    //     if (pageSizeNumber <= 0) {
    //         setSearchParams((prevParams) => {
    //             prevParams.set("pageSize", 10);
    //             return prevParams;
    //         });
    //         setPageSizeNumber(10);
    //     }
    // }, [pageNumber, pageSizeNumber, setSearchParams]);

    // if (pageNumber <= 0 || pageSizeNumber <= 0) return <LoaderComponent />;
    return (
        <main className="hidden-container flex-1 bg-quater-black p-2.5 shadow-2x2 flex overflow-scroll">
            <Outlet />
            {/* <PopupComponent /> */}
        </main>
    );
};

export default BodyComponent;
