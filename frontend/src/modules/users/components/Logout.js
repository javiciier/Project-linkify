import {Card, CircularProgress, makeStyles } from '@material-ui/core';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import * as actions from '../redux/actions';

/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles(() => ({
    component: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        margin: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const spinnerStyle = {
    'color': '#004A7C',
    'margin': '5%',
};

/* ************************************ COMPONENTE ************************************ */
/**
 * Pantalla de cierre de sesión
 */
const Logout = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const msDelay = 3*1000;

    useEffect(() => {
        dispatch(actions.logout());

        setTimeout( () => {
            history.replace('/');
        }, msDelay)
    });
    

    return (
        <div className={styles.component}>
            <Card className={styles.card}>
                <h2>Volviendo a pantalla de inicio</h2>
                <CircularProgress style={spinnerStyle}/>
            </Card>

        </div>
    )
}

export default Logout;
