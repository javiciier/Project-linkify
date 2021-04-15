package com.commitguy.backend.model.services;

import com.commitguy.backend.model.daos.UserDao;
import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.model.exceptions.NonExistentUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PermissionCheckerImpl implements PermissionChecker {
    @Autowired
    private UserDao userDao;


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


}
