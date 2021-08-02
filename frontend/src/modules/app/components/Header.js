import {useState, createRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import 'fontsource-roboto';

import users, { ProfilePicture } from '../../users';

import { AppBar, Toolbar, Typography, Menu, MenuItem, Button } from '@material-ui/core';

/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    appBar: {
        backgroundColor: '#E8F1F5',
        display: 'inline',
        justifyContent: 'space-between',
        flexGrow: 1,
        height: '4em',
        position: 'sticky',
        top: '0',
    },
    appLogo: {
        flex: 1,
        fontWeight: 'bold'
    },
    toolbarActions: {
        display: 'flex',
    },
    userActions: {
        display: 'flex',
        // flex: 1,
        // justifyContent: 'space-between',
    },
    userButton: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: '#004A7C',
        backgroundColor: '#E8F1F5'
    },
    menuButtonText: {
        margin: '0% 5% 0% 5%',
    },
    link: {
        color: '#005691',
        textDecoration: 'none'
    },
    navLink: {
        fontFamily: 'Roboto',
        textDecoration: 'none',
        color: '#005691',
    }
}));

const menuAnchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
}

const menuTransformOrigin = {
    vertical: 'top',
    horizontal: 'center',
}

/* ************************************ COMPONENTE ************************************ */
/**
 * Cabecera de las páginas web
 */
const Header = () => {
    const styles = useStyles();
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);         // Elemento al que está anclado el menú
    const [shouldMenuOpen, setMenuOpen] = useState(false);
    let nickName = useSelector(users.selectors.getNickname);
    const isLoggedIn = useSelector(users.selectors.isLoggedIn);
    let buttonRef = createRef(null);
    
    /* ************************************ FUNCIONES ************************************ */

    useEffect( () => { }, [nickName]);

    const showUserActions = () => {
        const handleButtonClick = () => {
            setMenuOpen(true);
            setMenuAnchorEl(buttonRef.current);
        };

        const handleMenuClose = () => {
            setMenuOpen(false);
            setMenuAnchorEl(null);
        };

        return (
            <>
                <Button
                    className={styles.userButton}
                    variant="outlined"
                    onClick={handleButtonClick}
                    ref={buttonRef}
                >
                    <ProfilePicture />
                    <div className={styles.menuButtonText}>
                        {nickName ? nickName.substring(0, 12) : ''}
                    </div>
                </Button>

                <Menu
                    anchorEl={menuAnchorEl}
                    getContentAnchorEl={null}
                    keepMounted
                    open={shouldMenuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={menuAnchorOrigin}
                    transformOrigin={menuTransformOrigin}
                >
                    <MenuItem onClick={() => setMenuOpen(false)}>
                        <Link to="/users/profile"
                            className={styles.link}
                        >
                            Ver perfil
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={() => setMenuOpen(false)}>
                        <Link to="/users/change-password"
                            className={styles.link}
                        >
                            Cambiar contraseña
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={() => setMenuOpen(false)}>
                        <Link to="/users/update-profile"
                            className={styles.link}
                        >
                            Actualizar perfil
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={() => setMenuOpen(false)}>
                        <Link href="#" to="/logout"
                            className={styles.link}
                        >
                            Desconectar
                        </Link>
                    </MenuItem>
                </Menu>
            </>
        )
    }

    /* ************************************ COMPONENTE ************************************ */
    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar>
                {/* Logotipo */}
                <Typography variant="h4" className={styles.appLogo}>
                    <Link to="/" className={styles.link}>LINKIFY</Link>
                </Typography>
        
                {/* Acciones del usuario */}
                {isLoggedIn && showUserActions()}
            </Toolbar>
        </AppBar>
    )
}

export default Header;
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
