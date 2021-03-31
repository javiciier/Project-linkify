package com.commitguy.backend.services;

import com.commitguy.backend.entities.User;
import com.commitguy.backend.exceptions.NonExistentUserException;

public interface UserService {
    /**
     * Actualiza el perfil del usuario con los nuevos datos recibidos
     * @param newUser Usuario con los nuevos datos a actualizar
     * @return El usuario con los nuevos datos
     */
    public User updateProfile(User newUser) throws NonExistentUserException;
}
