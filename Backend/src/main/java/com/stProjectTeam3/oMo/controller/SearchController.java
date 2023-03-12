package com.stProjectTeam3.oMo.controller;

import com.stProjectTeam3.oMo.dto.SearchResultDto;
import com.stProjectTeam3.oMo.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@ResponseBody
public class SearchController {

    final private SearchService searchService;

    @GetMapping("/search")
    public List<SearchResultDto> getSearchList(@RequestParam(value = "query") String query, @RequestParam(value = "page", required = false) String page){
        int iPage = 0;
        if(StringUtils.isNumeric(page)) iPage = Integer.parseInt(page);
        return searchService.search(query, "ko-KO", iPage);
    }

}
