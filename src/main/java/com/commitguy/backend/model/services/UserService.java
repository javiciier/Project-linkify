package com.commitguy.backend.model.services;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.exceptions.NonExistentUserException;
import com.commitguy.backend.model.exceptions.common.PermissionException;

public interface UserService {
    /**
     * Actualiza el perfil del usuario con los nuevos datos recibidos
     * @param newUser Usuario con los nuevos datos a actualizar
     * @return El usuario con los nuevos datos
     * @throws NonExistentUserException El usuario a modificar no existe
     * @throws PermissionException No se dispone de los permisos suficientes
     */
    public User updateProfile(User newUser) throws NonExistentUserException, PermissionException;
}
