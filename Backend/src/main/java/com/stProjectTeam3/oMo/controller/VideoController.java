package com.stProjectTeam3.oMo.controller;

import com.stProjectTeam3.oMo.dto.VideoDto;
import com.stProjectTeam3.oMo.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@ResponseBody
public class VideoController {

    private final VideoService videoService;

    @GetMapping("/movie/{id}/video")
    public ResponseEntity<List<VideoDto>> getMovieVideo(@PathVariable("id") String id){
        try {
            if(!StringUtils.isNumeric(id)) new NoSuchElementException();

            String language = "ko-KO";

            return ResponseEntity.ok().body(videoService.getMovieVideos(Integer.parseInt(id), language));

        }catch (NoSuchElementException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
        }
    }

    @GetMapping("/tv_series/{id}/video")
    public ResponseEntity<List<VideoDto>> getTvVideo(@PathVariable("id") String id){
        try {
            if(!StringUtils.isNumeric(id)) new NoSuchElementException();

            String language = "ko-KO";

            return ResponseEntity.ok().body(videoService.getTvVideos(Integer.parseInt(id), language));

        }catch (NoSuchElementException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
        }
    }

}
