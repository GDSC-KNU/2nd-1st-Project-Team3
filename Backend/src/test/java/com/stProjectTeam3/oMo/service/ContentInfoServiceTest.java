package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import com.stProjectTeam3.oMo.dto.ContentInfoDto;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ContentInfoServiceTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    void movieInfoTest(){
        int id = 22803;
        String language = "ko-KO";

        ContentInfoService contentInfoService = ac.getBean(ContentInfoService.class);
        ContentInfoDto result = contentInfoService.getMovieInfo(id, language);
        System.out.println("result = " + result);
    }

    @Test
    void tvInfoTest(){
        int id = 119769;
        String language = "ko-KO";

        ContentInfoService contentInfoService = ac.getBean(ContentInfoService.class);
        ContentInfoDto result = contentInfoService.getTvSeriesInfo(id, language);

        System.out.println("result = " + result);
    }
}
