package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.dto.ContentInfoDto;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbMovies;
import info.movito.themoviedbapi.TmdbTV;
import info.movito.themoviedbapi.model.MovieDb;
import info.movito.themoviedbapi.model.tv.TvSeries;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContentInfoService {

    @Value("${tmdb.key}")
    String apiKey;

    // 선택 후 사용
    String image_BasePath = "https://image.tmdb.org/t/p/";
    String[] post_size = {"w92","w154","w185","w342","w500","w780","original"};
    String[] backdrop_size = {"w300","w780","w1280","original"};

    public ContentInfoDto getMovieInfo(int id, String language){
        TmdbMovies tmdbMovies = new TmdbApi(apiKey).getMovies();
        MovieDb movie = tmdbMovies.getMovie(id, language);

        List<String> genreString = new ArrayList<String>();

        movie.getGenres().forEach(genre -> genreString.add(genre.getName()));

        ContentInfoDto contentInfoDto = ContentInfoDto.builder()
                .id(movie.getId())
                .original_title(movie.getOriginalTitle())
                .title(movie.getTitle())
                .backdrop_path(image_BasePath + backdrop_size[2] + "/" + movie.getBackdropPath())
                .poster_path(image_BasePath + post_size[6] + "/" + movie.getPosterPath())
                .genres(genreString)
                .overview(movie.getOverview())
                .voteAverage(movie.getVoteAverage())
                .release_date(movie.getReleaseDate())
                .runtime(movie.getRuntime())
                .build();

        return contentInfoDto;
    }

    public ContentInfoDto getTvSeriesInfo(int id, String language){
        TmdbTV tmdbTV = new TmdbApi(apiKey).getTvSeries();
        TvSeries tvSeries = tmdbTV.getSeries(id, language);

        List<String> genreString = new ArrayList<String>();

        tvSeries.getGenres().forEach(genre -> genreString.add(genre.getName()));

        ContentInfoDto contentInfoDto = ContentInfoDto.builder()
                .id(tvSeries.getId())
                .original_title(tvSeries.getOriginalName())
                .title(tvSeries.getName())
                .backdrop_path(image_BasePath + backdrop_size[2] + "/" + tvSeries.getBackdropPath())
                .poster_path(image_BasePath + post_size[6] + "/" + tvSeries.getPosterPath())
                .genres(genreString)
                .overview(tvSeries.getOverview())
                .voteAverage(tvSeries.getVoteAverage())
                .release_date(tvSeries.getFirstAirDate())
                .runtime(tvSeries.getEpisodeRuntime().stream().mapToInt(Integer::intValue).sum())
                .build();

        return contentInfoDto;
    }
}
