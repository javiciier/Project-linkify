package com.commitguy.backend.model.services;

import com.commitguy.backend.model.daos.UserDao;
import com.commitguy.backend.model.entities.User;

import com.commitguy.backend.model.entities.UserAccount;
import com.commitguy.backend.model.exceptions.UserAlreadyExistsException;
import com.commitguy.backend.model.exceptions.IncorrectLoginException;
import com.commitguy.backend.model.exceptions.NonExistentUserException;
import com.commitguy.backend.model.exceptions.common.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Override
    public User updateProfile(User newUser) throws NonExistentUserException, PermissionException {
        User actualUser = permissionChecker.fetchUser(newUser.getId());

        if (newUser.getName() != null)
            actualUser.setName(newUser.getName());

        if (newUser.getSurname1() != null)
            actualUser.setSurname1(newUser.getSurname1());

        if (newUser.getSurname2() != null)
            actualUser.setSurname2((newUser.getSurname2()));

        if (newUser.getEmail() != null)
            actualUser.setEmail(newUser.getEmail());

        if (newUser.getImage() != null)
            actualUser.setImage(newUser.getImage());

        return actualUser;
    }

    @Override
    public void signUp(User newUser) throws UserAlreadyExistsException {
        // Comprobar si existe una cuenta con las mismas credenciales
        if (userDao.existsByName(newUser.getNickName()))
            throw new UserAlreadyExistsException(newUser.getNickName());

        // Cifrar la contraseña recibida
        String cypheredPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(cypheredPassword);

        // Guardar el usuario en la BBDD
        userDao.save(newUser);
        System.out.println("Created new user: " + newUser.getNickName());
    }


    @Transactional(readOnly = true)
    @Override
    public User login(String nickName, String password) throws IncorrectLoginException {
        // Buscar el usuario en la BBDD
        Optional<User> user = userDao.findByNickName(nickName);
        if (!user.isPresent())
            throw new IncorrectLoginException("Usuario no encontrado");
        User retrievedUser = user.get();

        // Comprobar si contraseñas coinciden
        if (!passwordEncoder.matches(password, retrievedUser.getPassword()))
            throw new IncorrectLoginException("Contraseña incorrecta");

        return retrievedUser;
    }

    @Transactional(readOnly = true)
    @Override
    public User loginFromId(Long userId) throws NonExistentUserException {
        return permissionChecker.fetchUser(userId);
    }

    @Override
    public User changePassword(Long userId, String oldPassword, String newPassword) throws NonExistentUserException, IncorrectLoginException {
        // Buscar el usuario en la BBDD
        User user = permissionChecker.fetchUser(userId);

        // Comprobar si las contraseñas antiguas coinciden
        if (!passwordEncoder.matches(oldPassword, user.getPassword()))
            throw new IncorrectLoginException("Contraseñas antiguas no coinciden");

        // Cifrar nueva contraseña y actualizarla en la cuenta
        String newCypheredPassword = passwordEncoder.encode(newPassword);
        user.setPassword(newCypheredPassword);
        User updatedUser = userDao.save(user);

        return updatedUser;
    }
}
