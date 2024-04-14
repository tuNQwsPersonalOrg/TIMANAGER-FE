import React from 'react';
import './styles.css';
import HeaderComponent from './HeaderComponent';
import BodyComponent from './BodyComponent';
import SideBarComponent from './SideBarComponent';

const LayoutComponent = () => {
    return (
        <div className="root-page">
            <HeaderComponent />
            <div className="body hidden-container flex-1 gap-2.5">
                <SideBarComponent />
                <BodyComponent />
            </div>
        </div>
    );
};

export default LayoutComponent;
