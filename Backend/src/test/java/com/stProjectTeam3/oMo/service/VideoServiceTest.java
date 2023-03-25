package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import com.stProjectTeam3.oMo.dto.VideoDto;
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
        List<VideoDto> movieVideos = videoService.getMovieVideos(id, language);

        for (VideoDto movieVideo : movieVideos) {
            System.out.println("link: " + movieVideo.getLink() + " key: " + movieVideo.getKey());
        }
    }

    @Test
    void getTvVideoTest(){
        int id = 119769;
        String language = "ko-KO";

        VideoService videoService = ac.getBean(VideoService.class);
        List<VideoDto> tvVideos = videoService.getTvVideos(id, language);

        for (VideoDto tvVideo : tvVideos) {
            System.out.println("link: " + tvVideo.getLink() + " key: " + tvVideo.getKey());
        }
    }
}
