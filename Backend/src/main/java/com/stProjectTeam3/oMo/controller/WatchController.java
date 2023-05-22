package com.stProjectTeam3.oMo.controller;

import com.stProjectTeam3.oMo.dto.CheckRequest;
import com.stProjectTeam3.oMo.service.WatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class WatchController {

    private final WatchService watchService;

    @PostMapping(value = "/watch/check")
    public ResponseEntity<Boolean> check(@RequestBody CheckRequest checkRequest) throws  Exception{
        return new ResponseEntity<>(watchService.check(checkRequest.getAccount(), checkRequest.getContentId(), checkRequest.getType()), HttpStatus.OK);
    }

    @PostMapping(value = "/watch/uncheck")
    public ResponseEntity<Boolean> uncheck(@RequestBody CheckRequest checkRequest){
        return new ResponseEntity<>(watchService.uncheck(checkRequest.getAccount(), checkRequest.getContentId(), checkRequest.getType()), HttpStatus.OK);
    }

    @GetMapping(value = "/watch")
    public ResponseEntity<Boolean> getWatched(@RequestParam(value = "account") String account, @RequestParam(value = "contentId") Long contentid,
                                              @RequestParam(value = "type") String type){
        return new ResponseEntity<>(watchService.getWatchedContent(account, contentid, type), HttpStatus.OK);
    }
}
