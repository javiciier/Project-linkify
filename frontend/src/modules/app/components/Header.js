import React, { Fragment, useState } from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { Box, IconButton, makeStyles } from '@material-ui/core';

import users from '../../users';

import { AppBar, Container, Icon, Toolbar, Typography, List, ListItem, Menu, MenuItem, Button } from '@material-ui/core';
import { flexbox } from '@material-ui/system';

/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( (theme) => ({
    appBar: {
        backgroundColor: '#E8F1F5',
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        flexGrow: 1,
        height: 'auto'
    },
    appLogo: {
        flex: 1,
        fontWeight: 'bold'
    },
    toolbarActions: {
        // display: 'flex',
    },
    userActions: {
        display: 'flex',
        // flex: 1,
        // justifyContent: 'space-between',
    },
    link: {
        color: '#005691',
        textDecoration: 'none'
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
    const nickName = useSelector(users.selectors.getNickname);
    
    /* ************************************ FUNCIONES ************************************ */
    const showUserActions = () => {
        const [menuAnchorEl, setMenuAnchorEl] = useState(null);         // Elemento al que está anclado el menú
        const [shouldMenuOpen, setMenuOpen] = useState(false);

        const handleButtonClick = (e) => {
            setMenuOpen(true);
            setMenuAnchorEl(e.currentTarget);
        };

        const handleMenuClose = () => {
            setMenuOpen(false);
            setMenuAnchorEl(null);
        };


        return (
            <>
                <Button
                    variant="outlined"
                    onClick={handleButtonClick}
                    >
                    nickName
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
                    <MenuItem>
                        <Link to="/users/change-password" className={styles.link}>
                            Cambiar contraseña
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link to="/users/update-profile" className={styles.link}>
                            Actualizar perfil
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link to="/users/logout" className={styles.link}>
                            Desconectar
                        </Link>
                    </MenuItem>
                </Menu>
            </>
        )
    }

    const showNotLoggedInActions = () => {
        return (
            <div className="nonUserActions">
                <List className={styles.userActions}>
                    <ListItem>
                        <Button variant="text">
                            <Link to="/users/signup" className={styles.link}>
                                <h3>Registrarse</h3>
                            </Link>
                        </Button>
                    </ListItem>

                    <ListItem>
                        <Button>
                            <Link to="/users/login" className={styles.link}>
                                <h3>Acceder</h3>
                            </Link>
                        </Button>
                    </ListItem>
                </List>
            </div>
        )
    }

    /* ************************************ COMPONENTE ************************************ */
    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar>

                {/* Logotipo */}
                <Typography variant="h4" className={styles.appLogo}>
                    <Link to="/" className={styles.link}>Linkify</Link>
                </Typography>
        
                {/* Acciones del usuario */}
                {(nickName) ? showUserActions() : showNotLoggedInActions()}
            </Toolbar>
        </AppBar>
    )
}

export default Header;
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
