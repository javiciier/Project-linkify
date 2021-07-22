import {makeStyles} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Login } from '../../users';



/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    centeredText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    welcomeText: {
        margin: '3%',
        fontSize: '5vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    createAccountText: {
        fontSize: '3vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

}));


/* ************************************ COMPONENTE ************************************ */
/**
 * Pantalla de bienvenida
 */
const LandingPage = () => {
    const styles = useStyles();



    return (

        <>
            <div>
                <h2 className={styles.welcomeText}>Bienvenido a Linkify</h2>
            </div>

            <Login/>
            <h4 className={styles.createAccountText}>
                ¿Todavía no tienes una cuenta?
                <Link to='/signup'>
                    Crea tu cuenta
                </Link>
            </h4>

        </>
    )
};


export default LandingPage;
