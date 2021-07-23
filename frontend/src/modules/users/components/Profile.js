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

}));


/* ************************************ COMPONENTE ************************************ */
/**
 * Pantalla con información del usuario
 */
const Profile = () => {
    const styles = useStyles();

    const user = useSelector(users.selectors.getName);


    return (
        <div className={styles.component}>
            <h2>{user}</h2>
        </div>
    )
};


export default Profile;
