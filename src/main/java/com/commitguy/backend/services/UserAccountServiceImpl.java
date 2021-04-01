package com.commitguy.backend.services;

import com.commitguy.backend.daos.UserAccountDao;
import com.commitguy.backend.daos.UserDao;
import com.commitguy.backend.entities.User;
import com.commitguy.backend.entities.UserAccount;
import com.commitguy.backend.exceptions.AccountAlreadyExistsException;
import com.commitguy.backend.exceptions.IncorrectLoginException;
import com.commitguy.backend.exceptions.NonExistentUserAccountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

        System.out.println("Created new account: " + account.getNickName());
    }


    @Transactional(readOnly = true)
    @Override
    public User login(String nickName, String password) throws NonExistentUserAccountException, IncorrectLoginException {
        // Buscar la cuenta en la BBDD
        Optional<UserAccount> userAccount = userAccountDao.findByNickName(nickName);
        if (!userAccount.isPresent())
            throw new NonExistentUserAccountException();
        UserAccount account = userAccount.get();

        // Comprobar si contraseñas coinciden
        if (!passwordEncoder.matches(password, account.getPassword()))
            throw new IncorrectLoginException("Incorrect password");

        return account.getUser();
    }

    @Transactional(readOnly = true)
    @Override
    public User loginFromId(Long accountId) throws NonExistentUserAccountException {
        return permissionChecker.fetchUserAccount(accountId).getUser();
    }


    @Override
    public UserAccount changePassword(Long accountId, String oldPassword, String newPassword)
            throws NonExistentUserAccountException, IncorrectLoginException {
        // Buscar la cuenta en la BBDD
        UserAccount account = permissionChecker.fetchUserAccount(accountId);

        // Comprobar si las contraseñas antiguas coinciden
        if (!passwordEncoder.matches(oldPassword, account.getPassword()))
            throw new IncorrectLoginException("Old passwords don't match");

        // Cifrar nueva contraseña y actualizarla en la cuenta
        String newCypheredPassword = passwordEncoder.encode(newPassword);
        account.setPassword(newCypheredPassword);
        UserAccount updatedAccount = userAccountDao.save(account);

        return updatedAccount;
    }
}
