package com.commitguy.backend.model.services;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.entities.UserAccount;
import com.commitguy.backend.model.exceptions.AccountAlreadyExistsException;
import com.commitguy.backend.model.exceptions.IncorrectLoginException;
import com.commitguy.backend.model.exceptions.NonExistentUserAccountException;

public interface UserAccountService {
    /**
     * Crea una cuenta <code>account</code> y se la asigna al usuario <code>newUser</code>
     * @param account Datos de la nueva cuenta
     * @param newUser Datos del nuevo usuario
     * @throws AccountAlreadyExistsException La cuenta a crear ya existe
     */
    void signUp(UserAccount account, User newUser) throws AccountAlreadyExistsException;

    /**
     * Inicia sesión en la aplicación mediante el nombre de usuario y la contraseña de la cuenta.
     * @param nickName Nombre de usuario
     * @param password Contraseña
     * @return EL usuario asociado a la cuenta
     * @throws NonExistentUserAccountException No existe la cuenta introducida
     * @throws IncorrectLoginException Error introduciendo los datos de acceso
     */
    User login(String nickName, String password) throws NonExistentUserAccountException, IncorrectLoginException;

    /**
     * Inicia sesión en la aplicación a partir del ID del usuario.
     * @param accountId ID del usuario
     * @return El usuario asociado a la cuenta
     * @throws NonExistentUserAccountException No existe la cuenta del usuario
     */
    User loginFromId(Long accountId) throws NonExistentUserAccountException;

    /**
     * Cambia la contraseña de una cuenta.
     * @param accountId ID de la cuenta a modificar
     * @param oldPassword Antigua contraseña
     * @param newPassword Nueva contraseña
     * @return La cuenta de usuario con la nueva contraseña actualizada
     */
    UserAccount changePassword(Long accountId, String oldPassword, String newPassword) throws NonExistentUserAccountException, IncorrectLoginException;

}
