package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import com.stProjectTeam3.oMo.dto.SearchResultDto;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class SearchServiceTest {

    AnnotationConfigApplicationContext ac =  new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    void searchTest(){
        String query = "모범";
        String language = "ko-KO";
        int page = 0;
        SearchService searchService = ac.getBean(SearchService.class);
        List<SearchResultDto> result = searchService.search(query, language, page);

        for (SearchResultDto dto : result) {
            System.out.println("dto = " + dto);
        }
    }
}
