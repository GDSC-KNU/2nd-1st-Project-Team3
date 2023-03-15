package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.dto.CastDto;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbMovies;
import info.movito.themoviedbapi.TmdbTV;
import info.movito.themoviedbapi.model.people.PersonCast;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CreditService {

    @Value("${tmdb.key}")
    private String apiKey;

    String image_BasePath = "https://image.tmdb.org/t/p/";
    String[] profile_size = {"w45","w185","h632","original"};

    public List<CastDto> getMovieCast(int id){
        TmdbMovies tmdbMovies = new TmdbApi(apiKey).getMovies();
        List<PersonCast> cast = tmdbMovies.getCredits(id).getCast();

        List<CastDto> castDtoList = new ArrayList<>();

        for (PersonCast personCast : cast) {
            CastDto castDto = CastDto.builder()
                    .name(personCast.getName())
                    .character(personCast.getCharacter())
                    .profile_path(image_BasePath +profile_size[2] + personCast.getProfilePath())
                    .build();

            castDtoList.add(castDto);
        }

        return castDtoList;
    }

    public List<CastDto> getTvCast(int id, String language){
        TmdbTV tmdbTV = new TmdbApi(apiKey).getTvSeries();
        List<PersonCast> cast = tmdbTV.getCredits(id, language).getCast();

        List<CastDto> castDtoList = new ArrayList<>();

        for (PersonCast personCast : cast) {
            CastDto castDto = CastDto.builder()
                    .name(personCast.getName())
                    .character(personCast.getCharacter())
                    .profile_path(image_BasePath + profile_size[2] + personCast.getProfilePath())
                    .build();

            castDtoList.add(castDto);
        }

        return castDtoList;
    }
}
