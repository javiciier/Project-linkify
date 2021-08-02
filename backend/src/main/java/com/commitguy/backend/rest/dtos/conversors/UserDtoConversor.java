package com.commitguy.backend.rest.dtos.conversors;

import com.commitguy.backend.model.entities.User;
import com.commitguy.backend.rest.dtos.user.AuthenticatedUserDto;
import com.commitguy.backend.rest.dtos.user.UserDto;
import com.commitguy.backend.rest.dtos.user.UpdateUserDto;

public class UserDtoConversor {

    private UserDtoConversor() {}

    public static final UserDto toUserDto(User user) {
        UserDto dto = new UserDto(
                user.getId(),
                user.getName(),
                user.getSurname1(),
                user.getSurname2(),
                user.getPassword(),
                user.getNickName(),
                user.getEmail(),
                user.getAvatar());

        return dto;
    }

    public static final UpdateUserDto toUpdateUserDto(User user) {
        UpdateUserDto dto = new UpdateUserDto(
                user.getId(),
                user.getName(),
                user.getSurname1(),
                user.getSurname2(),
                user.getPassword(),
                user.getNickName(),
                user.getEmail(),
                user.getAvatar());

        return dto;
    }

    public static final AuthenticatedUserDto toAuthenticatedUserDto(User user, String token) {
        return new AuthenticatedUserDto(token, toUserDto(user));
    }

    public static final User toUser(UserDto dto) {
        User user = new User(
                dto.getName(),
                dto.getSurname1(),
                dto.getSurname2(),
                dto.getPassword(),
                dto.getNickName(),
                dto.getEmail(),
                dto.getAvatar());

        return user;
    }

}
