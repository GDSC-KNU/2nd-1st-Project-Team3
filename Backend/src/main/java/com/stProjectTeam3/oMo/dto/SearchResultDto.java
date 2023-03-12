package com.stProjectTeam3.oMo.dto;

import lombok.*;

@AllArgsConstructor
@ToString
@Getter
@Builder
public class SearchResultDto {

    private int id;
    private String original_title;
    private String title;
    private String date;
    private String media_type;
    private String poster_path;
}
