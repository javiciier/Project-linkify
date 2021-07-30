import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import {Container, Card, CardContent, CardActions, FormControl, TextField, Button} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import {makeStyles} from '@material-ui/core';

import users from '..';


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
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
    },
    avatarAndIdContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',                  // Centrar elementos
    },
    avatar: {
        height: 'auto',
        padding: '1vh',
        border: '2px solid black',
        borderRadius: '10px',
    },
    userID: {
        margin: 'auto',
    },
    userData: {
        display: 'inline-block',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '1.5vh'
    },
    textField: {
        margin: 'auto',
    },
    cardActions : {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1.5vh'
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
    const profileForm = useRef();
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
    /* ************************************ FUNCIONES ************************************ */

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    /* ************************************ COMPONENTE ************************************ */
    return (
        <div className={styles.component}>
            <Container className={styles.container}>
                <Card
                    className={styles.card}
                    component='form'
                    ref={profileForm}
                    onSubmit={handleSubmit}
                >
                    <CardContent>
                        <FormControl className={styles.form}>
                            <div className={styles.avatarAndIdContainer}>
                                <Container>
                                    <img className={styles.avatar}
                                        src={(avatar) ? `data:image/*;base64,${avatar}` : ''}
                                    />
                                </Container>
                                <div className={styles.userID}>
                                    <b>ID:</b> {id}
                                </div>
                            </div>

                            <div className={styles.userData}>
                                <TextField
                                    id='name-field'
                                    className={styles.textField}
                                    name='name'
                                    type='text'
                                    label='Nombre:'
                                    defaultValue={name}
                                    margin='auto'
                                    onChange={(e) => {}}
                                />

                                <TextField
                                    id='surname1-field'
                                    className={styles.textField}
                                    name='surname1'
                                    type='text'
                                    label='Primer apellido:'
                                    defaultValue={surname1}
                                    margin='auto'
                                    onChange={(e) => {}}
                                />
                            </div>

                        </FormControl>
                    </CardContent>


                    <CardActions className={styles.cardActions}>
                        <Button className={styles.button}
                            type='submit'
                            fullWidth
                            >
                            Actualizar perfil
                        </Button>

                        <Button className={styles.deleteButton}
                            type='submit'
                            fullWidth
                            startIcon={<DeleteForever />}
                        >
                            Eliminar perfil
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
};


export default UserProfile;