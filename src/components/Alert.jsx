/* eslint-disable react/prop-types */
// import React from 'react'

function Alert(props) {
    return (
        // <div style={{ height: "40px" }}>

        //     {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        //         <strong>{props.alert.type}</strong>:{props.alert.msg}
        //     </div>}
        // </div>
        <div className="alert alert-primary" role="alert">
            A simple primary alert—check it out!
        </div>
    )
}

export default Alert