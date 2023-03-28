import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div className="flex flex-col h-screen w-full px-10 pt-6 pb-10">
            <Header />
            <div className="h-full flex w-full gap-5">
                <div className="pt-5 border-r">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
