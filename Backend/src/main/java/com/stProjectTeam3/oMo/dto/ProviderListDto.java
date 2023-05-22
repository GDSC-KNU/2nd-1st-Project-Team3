package com.stProjectTeam3.oMo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@ToString
@Getter
@Builder
public class ProviderListDto {

    private List<ProviderDto> buyList;
    private List<ProviderDto> rentList;
    private List<ProviderDto> flatList;
}
