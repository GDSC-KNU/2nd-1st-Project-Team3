package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class VideoServiceTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    void getMovieVideoTest(){
        int id = 634649;
        String language = "ko-KO";

        VideoService videoService = ac.getBean(VideoService.class);
        List<String> movieVideos = videoService.getMovieVideos(id, language);

        for (String movieVideo : movieVideos) {
            System.out.println("movieVideo = " + movieVideo);
        }
    }

    @Test
    void getTvVideoTest(){
        int id = 119769;
        String language = "ko-KO";

        VideoService videoService = ac.getBean(VideoService.class);
        List<String> tvVideos = videoService.getTvVideos(id, language);

        for (String movieVideo : tvVideos) {
            System.out.println("movieVideo = " + movieVideo);
        }
    }
}
