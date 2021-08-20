import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {Container, Card, CardContent, CardActions, FormControl, TextField, Button} from '@material-ui/core';
import { Save, DeleteForever } from '@material-ui/icons';
import {makeStyles} from '@material-ui/core';

import {ErrorAlert} from '../../common';
import { PermissionError } from '../../../backend';
import users from '..';
import app from '../../app';


/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    component: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        minWidth: 'min-content',
        border: '2px #005691 solid',
        padding: '2vh'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
    },
    avatarAndIdContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',                  // Centrar elementos
    },
    avatar: {
        height: 'auto',
        padding: '1vh',
        border: '2px solid #005691',
        borderRadius: '10px',
    },
    userID: {
        margin: 'auto',
    },
    textField: {
        margin: '2rem',
        maxWidth: '95%',
        position: 'relative',
    },
    cardActions : {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        margin: '1.5vh',
    },
    button: {
        background: '#005691',
        fontWeight: 'bold',
        color: 'white',
    },
    deleteButton: {
        background: 'red',
        fontWeight: 'bold',
        color: 'white',
    }
}));


/* ************************************ COMPONENTE ************************************ */
/**
 * Pantalla con información del usuario
 */
const UserProfile = () => {
    const styles = useStyles();
    const dispatch = useDispatch();

    const id = useSelector(users.selectors.getUserId);
    const name = useSelector(users.selectors.getName);
    const surname1 = useSelector(users.selectors.getSurname1);
    const surname2 = useSelector(users.selectors.getSurname2);
    const nickName = useSelector(users.selectors.getNickname);
    const email = useSelector(users.selectors.getEmail);
    const avatar = useSelector(users.selectors.getAvatar);

    const [newName, setNewName] = useState('');
    const [newSurname1, setNewSurname1] = useState('');
    const [newSurname2, setNewSurname2] = useState('');
    const [newNickName, setNewNickName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [shouldUpdateProfile, setUpdateProfile] = useState(false);        // Indica si se debería actualizar perfil
    const [reloadProfile, setReloadProfile] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    let profileForm;

    /* ************************************ FUNCIONES ************************************ */

    const handleUpdateProfileSubmit = (e) => {
        e.preventDefault();

        if (profileForm.checkValidity()) {
            const newUserData = {
                id: Number(id),
                name: newName.trim() || name,
                surname1: newSurname1.trim() || surname1,
                surname2: newSurname2.trim() || surname2,
                nickName: newNickName.trim() || nickName,
                email: newEmail.trim() || email,
                avatar: newAvatar || avatar
            }
            let onSuccess = () => {
                setReloadProfile(true);
            }
            let onError = (errors) => {
                setBackendErrors(errors);
            }
            
            dispatch(users.actions.updateProfile(newUserData, onSuccess, onError));
        } else {
            setBackendErrors(null);
        }
    }

    const handleClickDeleteProfile = (e) => {
        e.preventDefault();
        console.log('delete profile submit');

        let onSuccess = () => {
            console.log('User correctly deleted');
            history.push('/');
        }
        let onError = (errors) => {
            setBackendErrors(errors);
        }
        let onUnauthorized = () => {
            console.log('Unauthorized')
            dispatch(app.actions.error(new PermissionError('No puedes eliminar este perfil'))).toObject();
        }

        dispatch(users.actions.deleteUser(Number(id), onSuccess, onError, onUnauthorized));
    }

    /**
     * Determina cuándo se producen nuevos cambios en los datos para activar el botón de confirmación.
     */
    const handleChange = () => {
        setUpdateProfile(true);
    }

    /* ************************************ COMPONENTE ************************************ */
    useEffect( () => {
        console.log('User profile has changed');
    }, [reloadProfile])


    return (
        <div className={styles.component}>
            <ErrorAlert
                errors={backendErrors}
                onCloseCallback={() => setBackendErrors(null)}
            />

            <Container className={styles.container}>
                <Card
                    className={styles.card}
                    component='form'
                    ref={(node) => profileForm = node}
                    onChange={handleChange}
                    onSubmit={handleUpdateProfileSubmit}
                >
                    <CardContent>
                        <FormControl className={styles.form}>
                            <div className={styles.avatarAndIdContainer}>
                                { avatar &&
                                    <Container>
                                    <img className={styles.avatar}
                                        src={(avatar) ? `data:image/*;base64,${avatar}` : ''}
                                    />
                                </Container>
                                }
                                <div className={styles.userID}>
                                    <b>ID:</b> {id}
                                </div>
                            </div>

                            {/* TODO: Añadir opción para actualizar foto de perfil */}
                            <TextField
                                id='name-field'
                                className={styles.textField}
                                name='name'
                                type='text'
                                label='Nombre:'
                                variant='outlined'
                                defaultValue={name}
                                onChange={(e) => {setNewName(e.target.value)}}
                            />

                            <TextField
                                id='surname1-field'
                                className={styles.textField}
                                name='surname1'
                                type='text'
                                label='Primer apellido:'
                                variant='outlined'
                                defaultValue={surname1}
                                onChange={(e) => {setNewSurname1(e.target.value)}}
                            />

                            <TextField
                                id='surname2-field'
                                className={styles.textField}
                                name='surname2'
                                type='text'
                                label='Segundo apellido:'
                                variant='outlined'
                                defaultValue={surname2}
                                onChange={(e) => {setNewSurname2(e.target.value)}}
                            />

                            <TextField
                                id='nickName-field'
                                className={styles.textField}
                                name='nickName'
                                type='text'
                                label='Nombre de usuario:'
                                variant='outlined'
                                defaultValue={nickName}
                                onChange={(e) => {setNewNickName(e.target.value)}}
                            />

                            <TextField
                                id='emaoñ-field'
                                className={styles.textField}
                                name='email'
                                type='text'
                                label='Correo electrónico:'
                                variant='outlined'
                                defaultValue={email}
                                onChange={(e) => {setNewEmail(e.target.value)}}
                            />
                        </FormControl>
                    </CardContent>


                    <CardActions>
                        <Container className={styles.cardActions}>
                            {shouldUpdateProfile &&
                                <Button className={styles.button}
                                type='submit'
                                fullWidth
                                startIcon={<Save />}
                                >
                                    Confirmar cambios
                                </Button>
                            }

                            <Button className={styles.deleteButton}
                                fullWidth
                                startIcon={<DeleteForever />}
                                onClick={handleClickDeleteProfile}
                                >
                                Eliminar perfil
                            </Button>
                        </Container>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
};


export default UserProfile;