package com.stProjectTeam3.oMo.controller;

import com.stProjectTeam3.oMo.dto.SearchResultDto;
import com.stProjectTeam3.oMo.dto.TrendDto;
import com.stProjectTeam3.oMo.service.TrendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@ResponseBody
public class TrendController {

    private final TrendService trendService;

    @GetMapping("/ranking")
    public List<TrendDto> getTrend(@RequestParam(value = "time", required = false) String time){
        if(time != null){
            if(Objects.equals(time, "week")){
                return trendService.getTrend(TrendService.Time_Window.WEEK);
            }
            else{
                return trendService.getTrend(TrendService.Time_Window.DAY);
            }
        }
        else{
            return trendService.getTrend(TrendService.Time_Window.DAY);
        }
    }

}
