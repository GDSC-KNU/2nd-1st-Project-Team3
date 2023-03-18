package com.stProjectTeam3.oMo.controller;

import com.stProjectTeam3.oMo.dto.SearchResultDto;
import com.stProjectTeam3.oMo.service.SimilarService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@ResponseBody
public class SimilarController {

    private final SimilarService similarService;

    @GetMapping("/movie/{id}/similar")
    public List<SearchResultDto> getMovieSimilar(@PathVariable("id") String id, @RequestParam(value = "page", required = false) String page){
        String language = "ko-KO";
        int iId = 1, iPage = 1;
        if(StringUtils.isNumeric(id)) iId = Integer.parseInt(id);
        if(StringUtils.isNumeric(page)) iPage = Integer.parseInt(page);

        return similarService.getMovieRecommend(iId, language,iPage);
//        return similarService.getMovieSimilar(iId, language, iPage);
    }

    @GetMapping("/tvseries/{id}/similar")
    public List<SearchResultDto> getTvSimilar(@PathVariable("id") String id, @RequestParam(value = "page", required = false) String page){
        String language = "ko-KO";
        int iId = 1, iPage = 1;
        if(StringUtils.isNumeric(id)) iId = Integer.parseInt(id);
        if(StringUtils.isNumeric(page)) iPage = Integer.parseInt(page);

        return similarService.getTvRecommend(iId, language, iPage);
//        return similarService.getTvSimilar(iId, language, iPage);
    }
}
