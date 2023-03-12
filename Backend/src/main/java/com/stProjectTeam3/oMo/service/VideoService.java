package com.stProjectTeam3.oMo.service;

import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbTV;
import info.movito.themoviedbapi.model.Video;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class VideoService {

    @Value("${tmdb.key}")
    String apiKey;

    public List<String> getMovieVideos(int id, String language){
        List<String> vList = new ArrayList<>();

        List<Video> videos = new TmdbApi(apiKey).getMovies().getVideos(id, language);
        if(videos == null) return vList;
        for (Video video : videos) {
            if(Objects.equals(video.getSite(), "YouTube")){
                vList.add("https://www.youtube.com/watch?v=" + video.getKey());
            }
        }

        return vList;
    }

    public List<String> getTvVideos(int id, String language){
        List<String> vList = new ArrayList<>();

        TmdbTV tvSeries = new TmdbApi(apiKey).getTvSeries();
        List<Video> videos = tvSeries.getSeries(id, language, TmdbTV.TvMethod.videos).getVideos();
        if(videos == null) {
            System.out.println("empty videos");
            return vList;
        }
        for (Video video : videos) {
            if(Objects.equals(video.getSite(), "YouTube")) {
                vList.add("https://www.youtube.com/watch?v=" + video.getKey());
            }
        }

        return vList;
    }

}
