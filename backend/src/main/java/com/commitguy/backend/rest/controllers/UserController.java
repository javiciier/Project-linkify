package com.commitguy.backend.rest.controllers;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.exceptions.IncorrectLoginException;
import com.commitguy.backend.model.exceptions.NonExistentUserException;
import com.commitguy.backend.model.exceptions.UserAlreadyExistsException;
import com.commitguy.backend.model.exceptions.common.PermissionException;
import com.commitguy.backend.model.services.UserService;
import com.commitguy.backend.rest.dtos.conversors.UserDtoConversor;
import com.commitguy.backend.rest.dtos.errors.ErrorDto;
import com.commitguy.backend.rest.dtos.user.*;
import com.commitguy.backend.rest.jwt.JwtGenerator;
import com.commitguy.backend.rest.jwt.JwtInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    /* @PathVariable: id (en las URL)   -    @RequestAttribute userId (igual que en JWT) */
    /**
     * Actualiza el perfil del usuario con los nuevos datos recibidos
     * @param userId ID del usuario que ejecuta la operación (extraído del JWT)
     * @param id ID del usuario a actualizar (extraído de la URL)
     * @param userDto Datos del nuevo usuario
     * @return El usuario con los nuevos datos
     */
    @PostMapping("/{id}/updateProfile")
    public UpdateUserDto updateProfile(@RequestAttribute Long userId,
                                 @PathVariable Long id,
                                 @Validated @RequestBody UpdateUserDto userDto) throws PermissionException, NonExistentUserException {
        // El usuario que quiere modificar su perfil debe ser el mismo que tiene la sesión activa
        if (!id.equals(userId))
            throw new PermissionException("Usuario no autorizado");

        // Crea el nuevo usuario con los datos y se los comunica al servicio para actualizarlo
        User user = new User(
                userId,
                userDto.getName(),
                userDto.getSurname1(),
                userDto.getSurname2(),
                userDto.getNickName(),
                userDto.getEmail(),
                userDto.getAvatar());
        User updatedUser = userService.updateProfile(user);

        return UserDtoConversor.toUpdateUserDto(updatedUser);
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
                //.location(redirectLocation)
                .body(UserDtoConversor.toAuthenticatedUserDto(user,userToken));

    }


    // TODO: DOCUMENTAR ESTE MÉTODO
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
    public UserDto loginFromUserToken(@RequestAttribute Long userId,
                                            @RequestAttribute String userToken) throws NonExistentUserException {
        // Busca el usuario por su id
        User user = userService.loginFromId(userId);
        return UserDtoConversor.toUserDto(user);
    }


    // TODO: DOCUMENTAR ESTE MÉTODO
    @PostMapping("/{id}/changePassword")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@RequestAttribute Long userId,
                               @PathVariable Long id,
                               @RequestBody ChangePasswordParamsDto params)
            throws NonExistentUserException, IncorrectLoginException, PermissionException {
        if (!id.equals(userId)) {
            throw new PermissionException();
        }

        userService.changePassword(id, params.getOldPassword(), params.getNewPassword());
    }


    // TODO: DOCUMENTAR ESTE MÉTODO
    /* Más info:
        - https://www.section.io/engineering-education/working-with-images-in-spring-boot/
        - https://zetcode.com/springboot/serveimage/
    */
    @GetMapping(value = "/{id}/avatar",
            produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> getAvatar(@PathVariable Long id)
            throws NonExistentUserException {
        try {
        // Obtiene los datos de la imagen del usuario
        String b64Avatar = userService.getAvatar(id);

        // Crea la respuesta
        return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(b64Avatar);
        } catch (Exception exc) {
            return ResponseEntity.notFound().build();
        }
    }


    // TODO: DOCUMENTAR ESTE MÉTODO
    /* Más info:
        - https://www.section.io/engineering-education/working-with-images-in-spring-boot/
        - https://zetcode.com/springboot/serveimage/
    */
    @PostMapping(value = "/{id}/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> setAvatar(@PathVariable Long id, @RequestParam MultipartFile imageFile)
            throws NonExistentUserException {
        // Establece la imagen del usuario
        userService.setAvatar(id, imageFile);
        // Crea la respuesta
        return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.IMAGE_JPEG)
                    .build();
    }

    /* ***************************** AUXILIAR FUNCTIONS ***************************** */
    private String generateUserToken(User user) {
        JwtInfo jwt = new JwtInfo(user.getId(), user.getNickName());

        return jwtGenerator.generateJWT(jwt);
    }
}
