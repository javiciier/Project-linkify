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
    const avatar = useSelector(users.selectors.getAvatar);


    return (
        <div className={styles.component}>
            <h2 className={styles.homeText}>
                Bienvenido {user}
            </h2>

            <p>
                Tu foto de perfil:
            </p>
            <img src={`data:image/jpeg;base64,${avatar}`} />
        </div>
    )
};


export default LandingPage;
