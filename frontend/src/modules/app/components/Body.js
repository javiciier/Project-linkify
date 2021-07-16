import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import users from '../../users';

import {AppStatusDialog} from '../../common'
import LandingPage from './LandingPage';
import {Login, Logout, Signup, Home} from '../../users';


/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    component: {
        minHeight: '100vh',
        backgroundColor: '#E9F1F5',
    }
}));

/* ************************************* COMPONENTE ************************************* */
/**
 * Cuerpo de la aplicación
 */
const Body = () => {
    /* ************************************ FUNCIONES ************************************ */
    const styles = useStyles();
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
    /* *********************************** COMPONENTE ************************************ */
    return (
        <div className={styles.component}>
            <AppStatusDialog/>
            <br/>
            <Switch>
                {!loggedIn && <Route exact path="/"><LandingPage/></Route>}
                {!loggedIn && <Route exact path="/users/login"> <Login/> </Route>}
                {!loggedIn && <Route exact path="/users/signup"> <Signup/> </Route>}
                {loggedIn && <Route exact path="/"> <Home/> </Route>}
                <Route exact path="/users/logout"> <Logout/> </Route>
            </Switch>
        </div>
    )
}

export default Body;
