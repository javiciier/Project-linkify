package com.commitguy.backend.services;

import com.commitguy.backend.daos.UserDao;
import com.commitguy.backend.entities.User;

import com.commitguy.backend.exceptions.NonExistentUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private PermissionChecker permissionChecker;



    @Override
    public User updateProfile(User newUser) throws NonExistentUserException {
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
}
