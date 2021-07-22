package com.commitguy.backend.model.services;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.exceptions.UserAlreadyExistsException;
import com.commitguy.backend.model.exceptions.IncorrectLoginException;
import com.commitguy.backend.model.exceptions.NonExistentUserException;
import com.commitguy.backend.model.exceptions.common.PermissionException;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    /**
     * Actualiza el perfil del usuario con los nuevos datos recibidos
     * @param newUser Usuario con los nuevos datos a actualizar
     * @return El usuario con los nuevos datos
     * @throws NonExistentUserException El usuario a modificar no existe
     */
    User updateProfile(User newUser) throws NonExistentUserException;

    /**
     * Crea una cuenta para el usuario
     * @param newUser Datos del nuevo usuario
     * @throws UserAlreadyExistsException El usuario a registrar ya existe
     */
    void signUp(User newUser) throws UserAlreadyExistsException;

    /**
     * Inicia sesión en la aplicación mediante el nombre de usuario y la contraseña de la cuenta.
     * @param nickName Nombre de usuario
     * @param password Contraseña
     * @return EL usuario asociado a la cuenta
     * @throws IncorrectLoginException Error introduciendo los datos de acceso
     */
    User login(String nickName, String password) throws IncorrectLoginException, NonExistentUserException;

    /**
     * Inicia sesión en la aplicación a partir del ID del usuario.
     * @param userId ID del usuario
     * @return El usuario asociado a la cuenta
     * @throws NonExistentUserException No existe el usuario
     */
    User loginFromId(Long userId) throws NonExistentUserException;

    /**
     * Cambia la contraseña de una cuenta.
     * @param userId ID del usuario a modificar
     * @param oldPassword Antigua contraseña
     * @param newPassword Nueva contraseña
     * @throws NonExistentUserException El usuario no existe
     * @throws IncorrectLoginException Error introduciendo los datos de acceso
     */
    void changePassword(Long userId, String oldPassword, String newPassword) throws NonExistentUserException, IncorrectLoginException;

    /**
     * Obtiene la foto de perfil del usuario.
     * @param userId Usuario que tiene la imagen
     * @return Imagen del usuario
     */
    public String getAvatar(Long userId) throws NonExistentUserException;


    /**
     * Establece como foto de perfil del usuario la imagen recibida.
     * @param userId Id del usuario
     * @param imageFile Imagen del usuario
     */
    public void setAvatar(Long userId, MultipartFile imageFile) throws NonExistentUserException;

}
