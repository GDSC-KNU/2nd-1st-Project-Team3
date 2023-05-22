package com.stProjectTeam3.oMo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckRequest {

    private String account;
    private Long contentId;
    private String type;
}