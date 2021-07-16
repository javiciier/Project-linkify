import {makeStyles} from '@material-ui/core';
import { useSelector } from 'react-redux';

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
        fontSize: '5vw'
    }

}));


/* ************************************ COMPONENTE ************************************ */
/**
 * Pantalla de bienvenida
 */
const LandingPage = () => {
    const styles = useStyles();

    const user = useSelector(users.selectors.getName);

    return (
        <div className={styles.component}>
            <h2 className={styles.homeText}>
                Bienvenido {user}
            </h2>
        </div>
    )
};


export default LandingPage;
