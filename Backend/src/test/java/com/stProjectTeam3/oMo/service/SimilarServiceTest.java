package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import com.stProjectTeam3.oMo.dto.SearchResultDto;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class SimilarServiceTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    public void getMovieRecommendTest(){
        int id = 122906;
        SimilarService similarService = ac.getBean(SimilarService.class);
        List<SearchResultDto> movieRecommend = similarService.getMovieRecommend(id, "ko-KO", 1);
        for (SearchResultDto searchResultDto : movieRecommend) {
            System.out.println("searchResultDto = " + searchResultDto);
        }
    }

    @Test
    public void getMovieSimilarTest(){
        int id = 122906;
        SimilarService similarService = ac.getBean(SimilarService.class);
        List<SearchResultDto> movieSimilar = similarService.getMovieSimilar(id, "ko-KO", 1);
        for (SearchResultDto searchResultDto : movieSimilar) {
            System.out.println("searchResultDto = " + searchResultDto);
        }
    }

    @Test
    public void getTvRecommendTest(){
        int id = 19885;
        SimilarService similarService = ac.getBean(SimilarService.class);
        List<SearchResultDto> tvRecommend = similarService.getTvRecommend(id, "ko-KO", 1);
        for (SearchResultDto searchResultDto : tvRecommend) {
            System.out.println("searchResultDto = " + searchResultDto);
        }
    }

    @Test
    public void getTvSimilarTest(){
        int id = 19885;
        SimilarService similarService = ac.getBean(SimilarService.class);
        List<SearchResultDto> tvSimilar = similarService.getTvSimilar(id, "ko-KO", 1);
        for (SearchResultDto searchResultDto : tvSimilar) {
            System.out.println("searchResultDto = " + searchResultDto);
        }
    }
}
