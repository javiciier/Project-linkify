package com.commitguy.backend.rest.controllers;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.exceptions.NonExistentUserException;
import com.commitguy.backend.model.exceptions.common.PermissionException;
import com.commitguy.backend.model.services.UserService;
import com.commitguy.backend.rest.dtos.ErrorDto;
import com.commitguy.backend.rest.dtos.UserDto;
import com.commitguy.backend.rest.dtos.conversors.UserDtoConversor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;


    /* ***************************** EXCEPTION HANDLERS ***************************** */
    @ExceptionHandler(value = NonExistentUserException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorDto handleNonExistentUserException(NonExistentUserException exc) {
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
    @PostMapping("/{userId}/updateProfile")
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
                userDto.getEmail(),
                userDto.getImage());
        updatedUser = userService.updateProfile(updatedUser);

        return UserDtoConversor.toUserDto(updatedUser);
    }


    /* ***************************** AUXILIAR FUNCTIONS ***************************** */
}
