import React from 'react';
import './styles.css';
import HeaderComponent from './HeaderComponent';
import BodyComponent from './BodyComponent';

const LayoutComponent = () => {
    return (
        <div className="root-page">
            <HeaderComponent />
            <BodyComponent />
        </div>
    );
};

export default LayoutComponent;
