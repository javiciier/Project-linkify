package com.commitguy.backend.model.daos;

import com.commitguy.backend.model.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserDao extends PagingAndSortingRepository<User, Long> {
    public boolean existsByNickName(String name);

    public Optional<User> findByName(String name);

    public Optional<User> findBySurname1(String surname1);

    public Optional<User> findBySurname2(String surname2);

    public Optional<User> findByEmail(String email);

    public Optional<User> findByNickName(String nickName);

    public Optional<User> removeById(Long id);
}
