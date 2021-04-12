package com.commitguy.backend.model.services;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.exceptions.UserAlreadyExistsException;
import com.commitguy.backend.model.exceptions.IncorrectLoginException;
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

    /**
     * Crea una cuenta <code>account</code> y se la asigna al usuario <code>newUser</code>
     * @param account Datos de la nueva cuenta
     * @param newUser Datos del nuevo usuario
     * @throws UserAlreadyExistsException La cuenta a crear ya existe
     */
    void signUp(User newUser) throws UserAlreadyExistsException;

    /**
     * Inicia sesión en la aplicación mediante el nombre de usuario y la contraseña de la cuenta.
     * @param nickName Nombre de usuario
     * @param password Contraseña
     * @return EL usuario asociado a la cuenta
     * @throws NonExistentUserAccountException No existe la cuenta introducida
     * @throws IncorrectLoginException Error introduciendo los datos de acceso
     */
    User login(String nickName, String password) throws IncorrectLoginException;

    /**
     * Inicia sesión en la aplicación a partir del ID del usuario.
     * @param accountId ID del usuario
     * @return El usuario asociado a la cuenta
     * @throws NonExistentUserAccountException No existe la cuenta del usuario
     */
    User loginFromId(Long userId) throws NonExistentUserException;

    /**
     * Cambia la contraseña de una cuenta.
     * @param userId ID de la cuenta a modificar
     * @param oldPassword Antigua contraseña
     * @param newPassword Nueva contraseña
     * @return La cuenta de usuario con la nueva contraseña actualizada
     */
    User changePassword(Long userId, String oldPassword, String newPassword) throws NonExistentUserException, IncorrectLoginException;

}
