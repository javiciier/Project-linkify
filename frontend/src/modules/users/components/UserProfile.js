import { useRef } from 'react';
import { useSelector } from 'react-redux';

import {Container, Card, CardContent, FormControl, TextField} from '@material-ui/core';
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
        justifyContent: 'center'
    },

    avatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2vh'
    },
    avatar: {
        height: 'auto',
        padding: '1vh',
        border: '2px solid black',
        borderRadius: '10px',
    },
    userID :{
        margin: 'auto',
    },
    
}));


/* ************************************ COMPONENTE ************************************ */
/**
 * Pantalla con información del usuario
 */
const UserProfile = () => {
    const styles = useStyles();
    const profileForm = useRef();
    const userID = useSelector(users.selectors.getUserId);
    const nickName = useSelector(users.selectors.getNickname);
    const avatar = useSelector(users.selectors.getAvatar);
    /* ************************************ FUNCIONES ************************************ */
    const handleSubmit = (e) => {}

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
                            <Container className={styles.avatarContainer}>
                                <img className={styles.avatar}
                                    src={(avatar) ? `data:image/*;base64,${avatar}` : ''}
                                />
                            </Container>

                            <div className={styles.userID}>
                                ID de usuario: {userID}
                            </div>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
};


export default UserProfile;





{/* 
                        <Grid container>
                            <Grid item>
                                <Container className={styles.avatarContainer}>
                                    <img
                                        src={(avatar) ? `data:image/jpeg;base64,${avatar}` : ``}
                                        className={styles.avatar}
                                    />
                                </Container>
                            </Grid>
                            <Grid item>hola</Grid>
                        </Grid>

                        <Grid container>
                            <Grid item>
                                <TextField
                                    className={styles.textField}
                                    variant='outlined'
                                    label='Nickname'
                                        value={nickName}
                                    size='medium'
                                />
                            </Grid>
                        </Grid> */
}