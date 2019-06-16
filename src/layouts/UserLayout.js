import React from 'react';


function UserLayout(props) {
    return (
        <div style={{'textAlign': 'center'}}>
            { props.children }
        </div>
    )
}

export default UserLayout;