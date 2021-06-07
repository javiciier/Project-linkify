import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';


import users from '../../users';


import {AppStatusDialog} from '../../common'


/**
 * Cuerpo de la aplicación
 */
const Body = () => {
    /* ************************************ FUNCIONES ************************************ */
    
    
    
    /* *********************************** COMPONENTE ************************************ */
    return (
        <div className={Body.name}>
            <AppStatusDialog/>

        </div>
    )
}

export default Body;
