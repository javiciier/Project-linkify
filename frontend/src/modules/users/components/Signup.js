import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router';

import * as actions from '../redux/actions';

import { ErrorAlert, ImageForm } from '../../common';
import {Container, Card, CardContent, CardActions, Typography, TextField, Button, FormControl} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
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
        border: '2px #005691 solid'
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
 * Formulario para registrar una nueva cuenta
 */
const Signup = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [surname1, setSurname1] = useState('');
    const [surname2, setSurname2] = useState('');
    const [nickName, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');                           // Contraseña del usuario
    const [confirmPassword, setConfirmPassword] = useState('');             // Contraseña de confirmación
    const [passwordsMatch, setPasswordsMatch] = useState(true);             // Indica si contraseña original y de confirmación coinciden
    const [avatar, setAvatar] = useState('');                               // Imagen que introduce el usuario
    const [backendErrors, setBackendErrors] = useState(null);
    let signupForm;
    
    /* ************************************ FUNCIONES ************************************ */
    const checkPasswordsMatch = () => {
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            return false;
        } else {
            return true;
        }
    }

    const handleAvatarInput = (e) => {
        /* INFO:
            - https://www.geeksforgeeks.org/how-to-convert-image-into-base64-string-using-javascript/
            - https://developer.mozilla.org/es/docs/Web/API/FileReader/readAsDataURL
        */
        e.preventDefault();
        
        // Extraer la imagen
        const image = e.target.files[0];

        // Convertir imagen a Base64 cuando se cargue el fichero
        const reader = new FileReader();
        reader.onload = () => {
            let b64String = reader.result
                                .replace('data:', '')
                                .replace(RegExp(/^.+,/,), '');
            setAvatar(b64String)
        }
        
        // Leer y guardar la imagen en el estado del formulario
        reader.readAsDataURL(image);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (signupForm.checkValidity() && checkPasswordsMatch()) {
            let userInfo = {
                name: name.trim(),
                surname1: surname1.trim(),
                surname2: surname2.trim(),
                nickName: nickName.trim(),
                email: email.trim(),
                password: password,
                avatar: avatar
            }
            let onSuccess = () => {
                history.push('/');
                window.location.reload();       // Workaround para forzar a redux a actualizar estado
            }
            let onError = (error) => {
                setBackendErrors(error);
            }
            let onUnauthorized = () => {
                history.push('/login');
                dispatch(actions.logout())
            }

            dispatch(actions.signUp(userInfo, onSuccess, onError, onUnauthorized));
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
                    Registrarse
                </Typography>

                <Card
                    className={styles.card}
                    component="form"
                    ref={(node) => signupForm = node}
                    onSubmit= {handleSubmit}
                >
                    <CardContent>
                    <FormControl className={styles.form}>
                        <TextField
                            id="name-input"
                            type="text"
                            name="name"
                            label="Nombre"
                            required
                            fullWidth
                            margin="normal"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            id="surname1-input"
                            type=""
                            name="surname1"
                            label="Primer apellido"
                            required
                            fullWidth
                            margin="normal"
                            onChange={(e) => setSurname1(e.target.value)}
                        />

                        <TextField
                            id="surname2-input"
                            type="text"
                            name="surname2"
                            label="Segundo apellido"
                            fullWidth
                            margin="normal"
                            onChange={(e) => setSurname2(e.target.value)}
                        />

                        <TextField
                            id="nickName-input"
                            type="text"
                            name="nickName"
                            label="Nombre de usuario"
                            required
                            fullWidth
                            margin="normal"
                            onChange={(e) => setNickname(e.target.value)}
                        />

                        <TextField
                            id="email-input"
                            type="text"
                            name="email"
                            label="Correo electrónico"
                            required
                            fullWidth
                            margin="normal"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            id="password-input"
                            type="text"
                            name="password"
                            label="Contraseña"
                            required
                            fullWidth
                            margin="normal"
                            onChange={(e) => setPassword(e.target.value)}
                        />



                        <TextField
                            id="passwordConfirmation-input"
                            type="text"
                            name="passwordConfirmation"
                            label="Repite la contraseña"
                            required
                            fullWidth
                            margin="normal"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <ImageForm
                            formName='avatar-form'
                            labelText='Agrega tu foto de perfil'
                            imageHandler={handleAvatarInput}
                        />

                        </FormControl>

                        {!passwordsMatch &&
                        <Alert severity="error">Las contraseñas no coinciden</Alert>}
                    </CardContent>

                    <CardActions>
                        <Button
                            className={styles.button}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Registrarse
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}

export default Signup;
