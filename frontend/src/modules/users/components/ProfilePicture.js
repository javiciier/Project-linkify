import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

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
    const image = useSelector(users.selectors.getAvatar);
    const userName = useSelector(users.selectors.getName);


    /* ************************************ FUNCIONES ************************************ */
    

    /* ************************************ COMPONENTE ************************************ */
    return (
        <Avatar 
            src={`data:image/jpeg;base64,${image}`}
            className={styles.avatar}
        >
            {/* En caso de no existir imagen, muestra la primera letra del nombre */}
            {userName.charAt(0)}
        </Avatar>
    )
}


export default ProfilePicture;