import React, { useContext } from 'react';
import Notes from './Note';

const Home = (props) => {

    return (
        <>
            <Notes alertshow={props.alertshow} />
        </>
    )
}

export default Home