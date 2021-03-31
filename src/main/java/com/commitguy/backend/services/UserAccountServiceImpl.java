package com.commitguy.backend.services;

import com.commitguy.backend.daos.UserAccountDao;
import com.commitguy.backend.daos.UserDao;
import com.commitguy.backend.entities.User;
import com.commitguy.backend.entities.UserAccount;
import com.commitguy.backend.exceptions.AccountAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserAccountServiceImpl implements UserAccountService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private UserAccountDao userAccountDao;

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;



    @Override
    public void signUp(UserAccount account, User newUser) throws AccountAlreadyExistsException {
        // Comprobar si existe una cuenta con las mismas credenciales
        if (userAccountDao.existsByNickName(account.getNickName()))
            throw new AccountAlreadyExistsException(account.getNickName());

        // Cifrar la contraseña recibida
        String cypheredPassword = passwordEncoder.encode(account.getPassword());
        account.setPassword(cypheredPassword);

        // Crear la cuenta y asignarle el nuevo usuario
        account.setUser(newUser);
        userDao.save(newUser);
        userAccountDao.save(account);

    }


    @Override
    public User login(String userName, String password) {
        //TODO: Implementar login
        return null;
    }


    @Override
    public User loginFromId(Long accountId) {
        //TODO: Implementar loginFromId
        return null;
    }


    @Override
    public UserAccount changePassword(Long accountId, String oldPassword, String newPassword) {
        //TODO: Implementar changePassword
        return null;
    }
}
