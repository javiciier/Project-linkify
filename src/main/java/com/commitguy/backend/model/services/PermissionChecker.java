package com.commitguy.backend.model.services;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.entities.UserAccount;
import com.commitguy.backend.model.exceptions.NonExistentUserException;

/**
 * Clase auxiliar que comprueba si la información de los usuarios y sus cuentas son correctos.
 */
public interface PermissionChecker {
    /**
     * Comprueba si el usuario existe a través de su id.
     * @param userId Identificador del usuario
     * @throws NonExistentUserException El usuario no existe
     */
    public void checkUserExists(Long userId) throws NonExistentUserException;

    /**
     * Obtiene el usuario asociado al id recibido.
     * @param userId Identificador del usuario
     * @return Usuario encontrado
     * @throws NonExistentUserException El usuario no existe
     */
    public User fetchUser(Long userId) throws NonExistentUserException;

}
