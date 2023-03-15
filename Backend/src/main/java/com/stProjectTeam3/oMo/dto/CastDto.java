package com.stProjectTeam3.oMo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
@Builder
public class CastDto {

    private String name;
    private String character;
    private String profile_path;
}
