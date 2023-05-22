package com.stProjectTeam3.oMo.controller;


import com.stProjectTeam3.oMo.dto.CheckRequest;
import com.stProjectTeam3.oMo.entity.Content;
import com.stProjectTeam3.oMo.service.ContentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ContentLikeController {

    private final ContentLikeService contentLikeService;

    @PostMapping(value = "/like/check")
    public ResponseEntity<Boolean> check(@RequestBody CheckRequest checkRequest) throws  Exception{
        return new ResponseEntity<>(contentLikeService.check(checkRequest.getAccount(), checkRequest.getContentId(), checkRequest.getType()), HttpStatus.OK);
    }

    @PostMapping(value = "/like/uncheck")
    public ResponseEntity<Boolean> uncheck(@RequestBody CheckRequest checkRequest){
        return new ResponseEntity<>(contentLikeService.uncheck(checkRequest.getAccount(), checkRequest.getContentId(), checkRequest.getType()), HttpStatus.OK);
    }

    @GetMapping(value = "/like/all")
    public ResponseEntity<List<Content>> getAll(@RequestParam String account){
        return new ResponseEntity<>(contentLikeService.getAllLike(account),HttpStatus.OK);
    }

    @GetMapping(value = "/like")
    public ResponseEntity<Boolean> getLikedContent(@RequestParam(value = "account") String account, @RequestParam(value = "contentId") Long contentid,
                                              @RequestParam(value = "type") String type){
        return new ResponseEntity<>(contentLikeService.getLikedContent(account, contentid, type),HttpStatus.OK);
    }
}
