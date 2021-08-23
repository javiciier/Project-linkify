import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from '../redux/actions';
import app from '../../app';
import {PermissionError} from '../../../backend';

import {ErrorAlert} from '../../common';
import {Container, Card, CardContent, CardActions, Typography, TextField, Button, FormControl, IconButton} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';


/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    component: {
        position: 'relative',
        margin: '5%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        border: '2px #005691 solid',
    },
    form: {
        width: '100%'
        
    },
    button: {
        background: '#005691',
        fontWeight: 'bold',
        color: 'white'
    }
}));

/* ************************************* COMPONENTE ************************************* */
/**
 * Formulario de inicio de sesión
 */
const Login = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    let loginForm;

    /* ************************************ FUNCIONES ************************************ */
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (loginForm.checkValidity()) {
            let onSuccess = () => history.push('/');
            let onError = (errors) => {
                setBackendErrors(errors);

            }
            let onUnauthorized = () => {
                history.push('/login');
                dispatch(actions.logout());
                dispatch(app.actions.error(
                    new PermissionError('No autorizado para realizar esta operación').toObject())
                )

            }
            
            dispatch(actions.login(nickName.trim(), password, onSuccess, onError, onUnauthorized));
        } else {
            setBackendErrors(null);
        }
    }


    /* ************************************ COMPONENTE ************************************ */
    return (
        <div className={styles.component}>
            <ErrorAlert
                errors={backendErrors}
                onCloseCallback={() => setBackendErrors(null)}
            />

            <Container className={styles.container}>
                <Typography variant="h4">
                    Iniciar sesión
                </Typography>

                <Card
                    className={styles.card}
                    component="form"
                    ref={(node) => loginForm = node}
                    onSubmit={handleSubmit}
                >
                    <CardContent>
                        <FormControl className={styles.form}>
                        <TextField
                            id="nickname-input"
                            type="text"
                            name="nickname"
                            label="Usuario"
                            required
                            fullWidth
                            margin="normal"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />

                        <div style={{'display': 'flex'}}>
                        <TextField
                            id="password-input"
                            type={(showPassword) ? 'text' : 'password'}
                            name="password"
                            label="Contraseña"
                            required
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={(e) => {e.preventDefault()}}
                        >
                            {(showPassword) ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </div>
                        </FormControl>
                    </CardContent>

                    <CardActions>
                        <Button
                            className={styles.button}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Acceder
                        </Button>
                    </CardActions>
                </Card>
            </Container>

        </div>
    )


}


export default Login;
