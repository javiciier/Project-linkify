import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';


import users from '../../users';

import {AppStatusDialog} from '../../common'
import LandingPage from './LandingPage';
import {Login, Logout, Signup, Home} from '../../users';


/**
 * Cuerpo de la aplicación
 */
const Body = () => {
    /* ************************************ FUNCIONES ************************************ */
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
    
    /* *********************************** COMPONENTE ************************************ */
    return (
        <div className={Body.name}>
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
