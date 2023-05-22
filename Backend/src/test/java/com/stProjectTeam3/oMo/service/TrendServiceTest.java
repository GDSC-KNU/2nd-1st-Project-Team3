package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import com.stProjectTeam3.oMo.dto.SearchResultDto;
import com.stProjectTeam3.oMo.dto.TrendDto;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class TrendServiceTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    public void getTrendTest(){
        TrendService.Time_Window time_window = TrendService.Time_Window.DAY;

        TrendService trendService = ac.getBean(TrendService.class);

        List<TrendDto> trend = trendService.getTrend(time_window);

        for (TrendDto trendDto : trend) {
            System.out.println("id: " + trendDto.getId() + " name: " + trendDto.getTitle() + " type: " + trendDto.getMedia_type());
        }
    }
}
