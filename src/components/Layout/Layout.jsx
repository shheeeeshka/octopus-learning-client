import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
    return (
        <div className="d-flex" style={{ height: "100%", width: "100%" }}>
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;