package com.stProjectTeam3.oMo.controller;

import com.stProjectTeam3.oMo.dto.CheckRequest;
import com.stProjectTeam3.oMo.service.WatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WatchController {

    private WatchService watchService;

    @PostMapping(value = "/watch/check")
    public ResponseEntity<Boolean> check(@RequestBody CheckRequest checkRequest) throws  Exception{
        try{
            return new ResponseEntity<>(watchService.check(checkRequest.getAccount(), checkRequest.getContentId(), checkRequest.getType()), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping(value = "/watch/uncheck")
    public ResponseEntity<Boolean> uncheck(@RequestBody CheckRequest checkRequest){
        return new ResponseEntity<>(watchService.uncheck(checkRequest.getAccount(), checkRequest.getContentId(), checkRequest.getType()), HttpStatus.OK);
    }
}
