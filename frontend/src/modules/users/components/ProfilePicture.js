import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import users from '..';


/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( (theme) => ({
    avatar: {
        height: theme.spacing(3),
        width: theme.spacing(3),
        margin: '5%'
    }
}))

/* ************************************ COMPONENTE ************************************ */
/**
    Foto de perfil del usuario
*/
const ProfilePicture = () => {
    const styles = useStyles();
    const avatar = useSelector(users.selectors.getAvatar);
    const userName = useSelector(users.selectors.getName);
    const userID = useSelector(users.selectors.getUserId);


    /* ************************************ FUNCIONES ************************************ */
    useEffect( () => {
        const image = users.actions.getAvatar(userID);
        users.actions.setAvatar(image);
    }, [avatar])


    /* ************************************ COMPONENTE ************************************ */
    return (
        
        <Avatar 
            src={ (avatar) ? `data:image/jpeg;base64,${avatar}` : '' }
            className={styles.avatar}
        >
            {/* En caso de no existir imagen, muestra la primera letra del nombre */}
            {(userName) ?
                userName[0]
                : null}
        </Avatar>
    )
}


export default ProfilePicture;