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
public class ContentInfoDto {

    private int id;
    private String original_title;
    private String title;
    private String backdrop_path;
    private String poster_path;
    private List<String> genres;
    private String overview;
    private float voteAverage;
    private String release_date;
    private int runtime;
    private List<String> videos;
    private List<CastDto> cast;
    private ProviderListDto providers;

}
