package com.commitguy.backend.rest.dtos;

import com.commitguy.backend.model.entities.User;

public class UserDtoConversor {

    private UserDtoConversor() {};

    public static final UserDto toUserDto(User user) {
        UserDto dto = new UserDto(user.getId(),
                user.getName(),
                user.getSurname1(),
                user.getSurname2(),
                user.getEmail(),
                user.getImage());

        return dto;
    }

    public static final User toUser(UserDto dto) {
        User user = new User(dto.getName(),
                dto.getSurname1(),
                dto.getSurname2(),
                dto.getEmail(),
                dto.getImage());

        return user;
    }
    
}
