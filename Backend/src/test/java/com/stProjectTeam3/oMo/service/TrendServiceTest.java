package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import com.stProjectTeam3.oMo.dto.SearchResultDto;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class TrendServiceTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    public void getTrendTest(){
        TrendService.Time_Window time_window = TrendService.Time_Window.DAY;

        TrendService trendService = ac.getBean(TrendService.class);

        List<SearchResultDto> trend = trendService.getTrend(time_window);

        for (SearchResultDto searchResultDto : trend) {
            System.out.println("id: " + searchResultDto.getId() + " name: " + searchResultDto.getTitle() + " type: " + searchResultDto.getMedia_type());
        }
    }
}
