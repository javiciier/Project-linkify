package com.commitguy.backend.daos;

import com.commitguy.backend.entities.UserAccount;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserAccountDao extends PagingAndSortingRepository<UserAccount, Long> {
    public boolean existsByAccountId(Long accountId);

    public Optional<UserAccount> findByNickName(String nickName);

    public Optional<UserAccount> removeByAccountId(Long accountId);

}
