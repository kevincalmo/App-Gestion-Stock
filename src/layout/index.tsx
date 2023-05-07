import React from 'react';
import SidebarWithHeader from "@/layout/Sidebar";

const Layout = ({children}: any) => {
    return (
        <SidebarWithHeader>
            {children}
        </SidebarWithHeader>
    );
}

export default Layout;