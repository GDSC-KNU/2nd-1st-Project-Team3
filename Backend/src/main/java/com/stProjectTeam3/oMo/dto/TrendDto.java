package com.stProjectTeam3.oMo.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@ToString
@Getter
@Builder
public class TrendDto{

    private int id;
    private String original_title;
    private String title;
    private String date;
    private String media_type;
    private String poster_path;
    private List<VideoDto> videos;

}
