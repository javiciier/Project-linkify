package com.commitguy.backend.model.services;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.entities.UserAccount;
import com.commitguy.backend.model.exceptions.AccountNotFromUserException;
import com.commitguy.backend.model.exceptions.NonExistentUserAccountException;
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


    /**
     * Comprueba si la cuenta de usuario existe a través de su id.
     * @param userAccountId Identificador de la cuenta
     * @throws NonExistentUserAccountException La cuenta no existe
     */
    public void checkUserAccountExists(Long userAccountId) throws NonExistentUserAccountException;


    /**
     * Obtiene la cuenta de usuario asociada al id recibido
     * @param userAccountId Identificador de la cuenta
     * @return Cuenta encontrada
     * @throws NonExistentUserAccountException La cuenta no existe
     */
    public UserAccount fetchUserAccount(Long userAccountId) throws NonExistentUserAccountException;

    /**
     * Comprueba que la cuenta de usuario se corresponde con el usuario recibido.
     * @param userId Identificador del usuario
     * @param userAccountId Identificador de la cuenta
     * @throws NonExistentUserException El usuario no existe
     * @throws AccountNotFromUserException La cuenta no pertenece al usuario recibido
     */
    public void checkUserAccountBelongsToUser(Long userId, Long userAccountId)
            throws NonExistentUserException, NonExistentUserAccountException, AccountNotFromUserException;
}
