package com.commitguy.backend.services;

import com.commitguy.backend.daos.UserAccountDao;
import com.commitguy.backend.daos.UserDao;
import com.commitguy.backend.entities.User;
import com.commitguy.backend.entities.UserAccount;
import com.commitguy.backend.exceptions.AccountNotFromUserException;
import com.commitguy.backend.exceptions.NonExistentUserAccountException;
import com.commitguy.backend.exceptions.NonExistentUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PermissionCheckerImpl implements PermissionChecker {
    @Autowired
    private UserDao userDao;

    @Autowired
    private UserAccountDao userAccountDao;



    @Override
    public void checkUserExists(Long userId) throws NonExistentUserException {
        if (!userDao.existsById(userId))
            throw new NonExistentUserException();
    }


    @Override
    public User fetchUser(Long userId) throws NonExistentUserException {
        Optional<User> user = userDao.findById(userId);

        if (!user.isPresent())
            throw new NonExistentUserException();

        return user.get();
    }


    @Override
    public void checkUserAccountExists(Long userAccountId) throws NonExistentUserAccountException {
        if (!userAccountDao.existsByAccountId(userAccountId))
            throw new NonExistentUserAccountException();
    }


    @Override
    public UserAccount fetchUserAccount(Long userAccountId) throws NonExistentUserAccountException {
        Optional<UserAccount> account = userAccountDao.findById(userAccountId);

        if (!account.isPresent())
            throw new NonExistentUserAccountException();

        return account.get();
    }


    @Override
    public void checkUserAccountBelongsToUser(Long userId, Long userAccountId)
            throws NonExistentUserException, NonExistentUserAccountException, AccountNotFromUserException {
        // Obtener el usuario y la cuenta
        User user = fetchUser(userId);
        UserAccount account = fetchUserAccount(userAccountId);

        // Comprobar si propietario de la cuenta es el usuario recibido
        if (!account.getUser().getId().equals(userId))
            throw new AccountNotFromUserException();

    }
}
