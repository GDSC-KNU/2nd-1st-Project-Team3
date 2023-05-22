package com.stProjectTeam3.oMo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
@Builder
public class ProviderDto {

    private String name;
    private String logo_path;
}
