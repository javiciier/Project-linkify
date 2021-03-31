package com.commitguy.backend.services;

import com.commitguy.backend.entities.User;
import com.commitguy.backend.entities.UserAccount;
import com.commitguy.backend.exceptions.AccountAlreadyExistsException;

public interface UserAccountService {
    void signUp(UserAccount account, User newUser) throws AccountAlreadyExistsException;

    User login(String userName, String password);

    User loginFromId(Long accountId);

    UserAccount changePassword(Long accountId, String oldPassword, String newPassword);

}
