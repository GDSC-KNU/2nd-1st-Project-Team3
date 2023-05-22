package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.dto.SearchResultDto;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbSearch;
import info.movito.themoviedbapi.model.MovieDb;
import info.movito.themoviedbapi.model.Multi;
import info.movito.themoviedbapi.model.tv.TvSeries;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Value("${tmdb.key}")
    private String apiKey;

    public List<SearchResultDto> search(String query, String language, int page){

        List<SearchResultDto> searchResultDtoList = new ArrayList<>();

        // 선택 후 사용
        String image_BasePath = "https://image.tmdb.org/t/p/";
        String[] post_size = {"w92","w154","w185","w342","w500","w780","original"};


        TmdbSearch tmdbSearch = new TmdbApi(apiKey).getSearch();
        TmdbSearch.MultiListResultsPage multi = tmdbSearch.searchMulti(query, language, page);
        List<Multi> results = multi.getResults();

        for (Multi result : results) {
            if(result.getMediaType() == Multi.MediaType.MOVIE){
                MovieDb md = (MovieDb) result;
                SearchResultDto searchResultDto = SearchResultDto.builder()
                        .id(md.getId())
                        .original_title(md.getOriginalTitle())
                        .title(md.getTitle())
                        .date(md.getReleaseDate())
                        .media_type("MOVIE")
                        .poster_path(image_BasePath + post_size[4] + md.getPosterPath())
                        .build();
                searchResultDtoList.add(searchResultDto);
            }
            else if (result.getMediaType() == Multi.MediaType.TV_SERIES){
                TvSeries ts = (TvSeries) result;
                SearchResultDto searchResultDto = SearchResultDto.builder()
                        .id(ts.getId())
                        .original_title(ts.getOriginalName())
                        .title(ts.getName())
                        .date(ts.getFirstAirDate())
                        .media_type("TV_SERIES")
                        .poster_path(image_BasePath + post_size[4] + ts.getPosterPath())
                        .build();
                searchResultDtoList.add(searchResultDto);
            }
        }

        return searchResultDtoList;
    }
}
