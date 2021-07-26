import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {makeStyles} from '@material-ui/core';

import users from '..';


/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    component: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    homeText: {
        margin: '5%',
        fontSize: '5vw',
    },
    user: {
        color: 'blue',
        fontSize: '10vw'
    }

}));


/* ************************************ COMPONENTE ************************************ */
/**
 * Pantalla de bienvenida
 */
const Home = () => {
    const styles = useStyles();
    const user = useSelector(users.selectors.getName);
    const [loading, setLoading] = useState(true);


    return (
        <div className={styles.component}>
            <div className={styles.homeText}>
                <span className={styles.user}> {user} </span>
            </div>
        </div>
    )
};


export default Home;
