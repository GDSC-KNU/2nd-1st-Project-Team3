package com.stProjectTeam3.oMo.dto;

import com.stProjectTeam3.oMo.Authority;
import com.stProjectTeam3.oMo.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignResponse {

    private Long id;

    private String account;

    private String nickname;

    private String name;

    private String email;

    private List<Authority> roles = new ArrayList<>();

    private String token;

    public SignResponse(Member member) {
        this.id = member.getId();
        this.account = member.getAccount();
        this.nickname = member.getNickname();
        this.name = member.getName();
        this.email = member.getEmail();
        this.roles = member.getRoles();
    }
}