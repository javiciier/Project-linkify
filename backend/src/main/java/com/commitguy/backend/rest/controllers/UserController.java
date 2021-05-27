package com.commitguy.backend.rest.controllers;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.exceptions.IncorrectLoginException;
import com.commitguy.backend.model.exceptions.NonExistentUserException;
import com.commitguy.backend.model.exceptions.UserAlreadyExistsException;
import com.commitguy.backend.model.exceptions.common.PermissionException;
import com.commitguy.backend.model.services.UserService;
import com.commitguy.backend.rest.dtos.conversors.UserDtoConversor;
import com.commitguy.backend.rest.dtos.errors.ErrorDto;
import com.commitguy.backend.rest.dtos.user.AuthenticatedUserDto;
import com.commitguy.backend.rest.dtos.user.ChangePasswordParamsDto;
import com.commitguy.backend.rest.dtos.user.UserDto;
import com.commitguy.backend.rest.dtos.user.UserLoginParamsDto;
import com.commitguy.backend.rest.jwt.JwtGenerator;
import com.commitguy.backend.rest.jwt.JwtInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    JwtGenerator jwtGenerator;


    /* ***************************** EXCEPTION HANDLERS ***************************** */
    @ExceptionHandler(value = NonExistentUserException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorDto handleNonExistentUserException(NonExistentUserException exc) {
        return new ErrorDto(exc.getMessage());
    }


    @ExceptionHandler(value = UserAlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorDto handleUserAlreadyExistsException(UserAlreadyExistsException exc) {
        return new ErrorDto(exc.getMessage());
    }

    @ExceptionHandler(value = IncorrectLoginException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorDto handleIncorrectLoginException(IncorrectLoginException exc) {
        return new ErrorDto(exc.getMessage());
    }

    /* ***************************** HTTP REQUEST HANDLERS ***************************** */

    /**
     * Actualiza el perfil del usuario con los nuevos datos recibidos
     * @param id ID del usuario que ejecuta la operación (extraído del JWT)
     * @param userId ID del usuario a actualizar (extraído de la URL)
     * @param userDto Datos del nuevo usuario
     * @return El usuario con los nuevos datos
     */
    @PutMapping("/{userId}/updateProfile")
    public UserDto updateProfile(@RequestAttribute Long id,
                                 @PathVariable Long userId,
                                 @Validated @RequestBody UserDto userDto) throws PermissionException, NonExistentUserException {
        // El usuario que quiere modificar su perfil debe ser el mismo que tiene la sesión activa
        if (!id.equals(userId))
            throw new PermissionException("Usuario no autorizado");

        // Crea el nuevo usuario con los datos y se los comunica al servicio para actualizarlo
        User updatedUser = new User(
                userDto.getName(),
                userDto.getSurname1(),
                userDto.getSurname2(),
                userDto.getPassword(),
                userDto.getNickName(),
                userDto.getEmail(),
                userDto.getImage());
        updatedUser = userService.updateProfile(updatedUser);

        return UserDtoConversor.toUserDto(updatedUser);
    }


    /**
     * Crea una cuenta para el usuario
     * @param userDto Datos del nuevo usuario
     * @throws UserAlreadyExistsException El usuario a registrar ya existe
     */
    @PostMapping("/signUp")
    public ResponseEntity<AuthenticatedUserDto> signUp(@Validated @RequestBody UserDto userDto) throws UserAlreadyExistsException {
        // Parsea los datos del usuario y lo registra
        User user = UserDtoConversor.toUser(userDto);
        userService.signUp(user);
        String userToken = generateUserToken(user);


        // Crea la URI de su perfil una vez se registre
        URI redirectLocation = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{userId}")
                .buildAndExpand(user.getId())
                .toUri();

        // Devuelve los datos al usuario y le redirige a su perfil
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .location(redirectLocation)
                .body(UserDtoConversor.toAuthenticatedUserDto(user,userToken));

    }


    @PostMapping("/login")
    public AuthenticatedUserDto login(@RequestBody UserLoginParamsDto params) throws IncorrectLoginException, NonExistentUserException {
        // Intenta iniciar sesión con el usuario recibido
        User user = userService.login(params.getNickName(), params.getPassword());

        // Genera un JWT para que el usuario mantenta sesión iniciada
        String userToken = generateUserToken(user);

        return UserDtoConversor.toAuthenticatedUserDto(user, userToken);
    }


    /**
     * Inicia sesión en la aplicación a partir del ID del usuario.
     * @param userId ID del usuario
     * @param userToken JWT del usuario
     * @return El usuario asociado a la cuenta
     * @throws NonExistentUserException No existe el usuario
     */
    @PostMapping("/loginUsingToken")
    public AuthenticatedUserDto loginFromId(@RequestAttribute Long userId,
                                            @RequestAttribute String userToken) throws NonExistentUserException {
        System.out.println("UserId: " + userId);
        System.out.println("UserToken: " + userToken);
        // Busca el usuario por su id
        User user = userService.loginFromId(userId);
        System.out.println(user.toString());
        return UserDtoConversor.toAuthenticatedUserDto(user, userToken);
    }


    @PostMapping("/{userId}/changePassword")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@RequestAttribute Long id,
                               @PathVariable Long userId,
                               @RequestBody ChangePasswordParamsDto params)
            throws NonExistentUserException, IncorrectLoginException, PermissionException {
        if (!id.equals(userId)) {
            throw new PermissionException();
        }

        userService.changePassword(id, params.getOldPassword(), params.getNewPassword());
    }


    /* ***************************** AUXILIAR FUNCTIONS ***************************** */
    private String generateUserToken(User user) {
        JwtInfo jwt = new JwtInfo(user.getId(), user.getNickName());

        return jwtGenerator.generateJWT(jwt);
    }
}
