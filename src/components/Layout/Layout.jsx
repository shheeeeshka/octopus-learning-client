import Sidebar from "../Sidebar/Sidebar";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const Layout = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

    const handleSwipe = (direction) => {
        if (direction === "Right") {
            setIsMenuOpened(true);
        } else if (direction === "Left") {
            setIsMenuOpened(false);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedRight: () => handleSwipe("Right"),
        onSwipedLeft: () => handleSwipe("Left"),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        delta: isMobile ? 30 : 0,
    });

    useEffect(() => {
        if (isMobile) setIsMenuOpened(false);
    }, [isMobile]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1200);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div {...swipeHandlers} className="d-flex" style={{ height: "100%", width: "100%" }}>
            <Sidebar isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} />
            <main>
                <Outlet />
                {
                    isMenuOpened && isMobile && <div className="overlay"></div>
                }
            </main>
        </div>
    );
}

export default Layout;