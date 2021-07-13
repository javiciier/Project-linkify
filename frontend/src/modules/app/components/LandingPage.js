import React from 'react';
import {makeStyles} from '@material-ui/core';



/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    component: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    landingPageText: {
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



    return (
        <div className={styles.component}>
            <h2 className={styles.landingPageText}>
                Landing Page
            </h2>
        </div>
    )
};


export default LandingPage;
