import React from 'react';
import SidebarWithHeader from "@/layout/Sidebar";

const Layout = ({children,stocks}: any) => {
    return (
        <SidebarWithHeader stocks={stocks}>
            {children}
        </SidebarWithHeader>
    );
}

export default Layout;