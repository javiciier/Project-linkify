package com.commitguy.backend.rest.jwt;

public class JwtInfo {
    private Long accountId;
    private String nickName;
    private Long userId;

    public JwtInfo(Long accountId, String nickName, Long userId) {
        this.accountId = accountId;
        this.nickName = nickName;
        this.userId = userId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
