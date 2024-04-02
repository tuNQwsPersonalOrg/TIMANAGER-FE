import { useCallback, useEffect, useState } from "react";

const useSelect = (container) => {
    const [expand, setExpand] = useState(false);
    const [selectBox, setSelectBox] = useState({
        width: 0,
        top: 0,
        left: 0,
        bottom: null,
        right: null,
    });

    // Re-calculate position of the fixed select component
    const handlePosition = useCallback(
        (e) => {
            if (!container) return;
            const selectRect = container.getBoundingClientRect();
            const viewportHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.documentElement.clientHeight,
            );
            const viewportWidth = Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth,
            );
            const hiddenTop = (60 * document.body.offsetWidth) / 1920;

            const box = {
                width: selectRect.width,
                top: null,
                right: null,
                bottom: null,
                left: null,
            };
            // Hide drop down when the top of container is less than {hiddenTop}
            if (selectRect.top <= hiddenTop) setExpand(false);
            // Set vertical position
            if (selectRect.bottom >= viewportHeight / 1.5) {
                box.bottom =
                    viewportHeight - selectRect.bottom + selectRect.height;
                box.top = null;
            } else {
                box.top = selectRect.top + selectRect.height;
                box.bottom = null;
            }
            // Set horizontal position
            if (selectRect.right >= viewportWidth / 1.5) {
                box.right = viewportWidth - selectRect.right;
                box.left = null;
            } else {
                box.left = selectRect.left;
                box.right = null;
            }

            setSelectBox({ ...box });
        },
        [container],
    );
    useEffect(() => {
        // Close dropdown select after clicked outside
        const handleBlur = (e) => {
            if (container && !container.contains(e.target)) setExpand(false);
        };
        document.addEventListener("click", handleBlur);

        // Init position on the first render
        handlePosition();
        window.addEventListener("scroll", handlePosition, { capture: true });

        // Close dropdown select when resizing
        const handleResize = () => {
            setExpand(false);
        };
        window.addEventListener("resize", handleResize);

        // Clean up function: remove event listener to avoid lacking memory
        return () => {
            document.removeEventListener("click", handleBlur);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handlePosition);
        };
    }, [container, handlePosition]);

    return { expand, selectBox, setExpand, toggleSelect: handlePosition };
};

export default useSelect;
