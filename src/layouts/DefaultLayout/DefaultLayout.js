import React from 'react';

const DefaultLayout = ({ children, title }) => {
    return (
        <div style={{ height: '100%', textAlign: 'center' }}>
            {children}
        </div>
    )
};

export default DefaultLayout;