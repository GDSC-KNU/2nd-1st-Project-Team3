package com.stProjectTeam3.oMo.controller;

import com.stProjectTeam3.oMo.dto.ContentInfoDto;
import com.stProjectTeam3.oMo.service.ContentInfoService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@ResponseBody
public class ContentInfoController {

    private final ContentInfoService contentInfoService;

    @GetMapping("/movie/{id}/info")
    public ResponseEntity<ContentInfoDto> getMovieInfo(@PathVariable String id){
        try {
            if(!StringUtils.isNumeric(id)) new NoSuchElementException();

            String language = "ko-KO";

            return ResponseEntity.ok().body(contentInfoService.getMovieInfo(Integer.parseInt(id), language));

        }catch (NoSuchElementException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
        }
    }

    @GetMapping("/tvseries/{id}/info")
    public ResponseEntity<ContentInfoDto> getTvSeriesInfo(@PathVariable String id){
        try {
            if(!StringUtils.isNumeric(id)) new NoSuchElementException();

            String language = "ko-KO";

            return ResponseEntity.ok().body(contentInfoService.getTvSeriesInfo(Integer.parseInt(id), language));

        }catch (NoSuchElementException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
        }
    }
}
