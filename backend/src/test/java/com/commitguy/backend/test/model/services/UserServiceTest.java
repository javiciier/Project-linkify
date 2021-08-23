package com.commitguy.backend.test.model.services;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.exceptions.IncorrectLoginException;
import com.commitguy.backend.model.exceptions.NonExistentUserException;
import com.commitguy.backend.model.exceptions.UserAlreadyExistsException;
import com.commitguy.backend.model.exceptions.common.PermissionException;
import com.commitguy.backend.model.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {
    private final String TESTING_USER_NICKNAME = "testUser";
    private final Long NON_EXISTENT_ID = Long.valueOf(-1);
    @Autowired private UserService userService;


    /* ******************** MÉTODOS AUXILIARES ******************** */
    private User createUser(String nickName) {
        return new User("user1", "surname1", "surname2", "password", nickName, nickName+"@email.com", "");
    }

    /* ************************** TESTS ************************** */
    /* ***** signUp ***** */
    @Test
    public void testSignUpAndLoginWithId() throws UserAlreadyExistsException, NonExistentUserException {
        // Crear usuario a registrar
        User user = createUser(TESTING_USER_NICKNAME);

        // Registrar usuario y obtener sus datos
        userService.signUp(user);
        User registeredUser = userService.loginFromId(user.getId());

        // Comprobaciones
        assertEquals(user, registeredUser);
    }

    @Test
    public void testSignUpTwice() throws UserAlreadyExistsException {
        // Crear usuario a registrar
        User user = createUser(TESTING_USER_NICKNAME);

        // Registrar usuario por primera vez
        userService.signUp(user);

        // Registrar usuario dos veces -> Lanzar excepción
        assertThrows(UserAlreadyExistsException.class, () ->
                userService.signUp(user)
        );
    }


    /* ***** login ***** */
    @Test
    public void testLogin() throws IncorrectLoginException, UserAlreadyExistsException, NonExistentUserException {
        // Crear usuario, obtener su contraseña sin cifrar y registrarlo
        User user = createUser(TESTING_USER_NICKNAME);
        String uncypheredPassword = user.getPassword();
        userService.signUp(user);

        // Iniciar sesión
        User loggedInUser = userService.login(user.getNickName(), uncypheredPassword);

        // Comprobar datos
        assertEquals(user, loggedInUser);
    }

    @Test
    public void testLoginWithNonExistentUser() throws NonExistentUserException {
        assertThrows(NonExistentUserException.class, () ->
                userService.login("JAJA","SALU2")
        );
    }

    @Test
    public void testLoginWithWrongPassword() throws UserAlreadyExistsException {
        // Crear el usuario y obtener su contraseña
        User user = createUser(TESTING_USER_NICKNAME);
        String originalPassword = user.getPassword();
        userService.signUp(user);

        // Iniciar sesión con contraseña distinta -> IncorrectLoginException
        assertThrows(IncorrectLoginException.class, () -> {
            String newPassword = originalPassword + "HOLAHOLACARACOLA";
            userService.login(user.getNickName(), newPassword);
        });
    }


    /* ***** loginFromId ***** */
    @Test
    public void testLoginUsingNonExistentID() throws IncorrectLoginException {
        assertThrows(NonExistentUserException.class, () ->
                userService.loginFromId(NON_EXISTENT_ID)
        );
    }


    /* ***** changePassword ***** */
    @Test
    public void testChangePassword() throws NonExistentUserException, IncorrectLoginException, UserAlreadyExistsException {
        // Crear usuario, obtener su contraseña y generar la nueva contraseña
        User user = createUser(TESTING_USER_NICKNAME);
        String oldPassword = user.getPassword();
        String newPassword = oldPassword + "HOLAHOLA";

        // Registrar al usuario, cambiar su contraseña e intentar iniciar sesión
        userService.signUp(user);
        userService.changePassword(user.getId(),oldPassword, newPassword);
        userService.login(user.getNickName(),newPassword);
    }

    @Test
    public void testChangePasswordFromNonExistentUser() {
        assertThrows(NonExistentUserException.class, () ->
            userService.changePassword(NON_EXISTENT_ID, "qwerty", "asdfg")
        );
    }

    @Test
    public void testChangePasswordUsingIncorrectOriginalPassword() throws UserAlreadyExistsException {
        // Crea al usuario, obtiene su contraseña y la modifica
        User user = createUser(TESTING_USER_NICKNAME);
        String originalPassword = user.getPassword();
        String fakePassword = originalPassword + "Fake";

        // Registra al usuario y prueba a cambiar la contraseña
        userService.signUp(user);
        assertThrows(IncorrectLoginException.class,() ->
            userService.changePassword(user.getId(), fakePassword, originalPassword)
        );
    }


    /* ***** updateProfile ***** */
    @Test
    public void testUpdateProfile() throws UserAlreadyExistsException, PermissionException, NonExistentUserException {
        // Crea el usuario y lo registra
        User user = createUser(TESTING_USER_NICKNAME);
        userService.signUp(user);

        // Modifica todos los campos del usuario y los registra
        user.setName("New" + user.getName());
        user.setSurname1("New" + user.getSurname1());
        user.setSurname2("New" + user.getSurname2());
        user.setEmail("new" + user.getEmail());
        user.setAvatar("new" + user.getAvatar());
        user.setNickName("new" + user.getNickName());
        user.setPassword("new" + user.getPassword());
        userService.updateProfile(user);

        // Obtiene el nuevo usuario y comprueba los valores
        User updatedUser = userService.loginFromId(user.getId());
        assertEquals(user, updatedUser);
    }

}
