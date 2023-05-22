package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.Member;
import com.stProjectTeam3.oMo.entity.Content;
import com.stProjectTeam3.oMo.entity.Watch;
import com.stProjectTeam3.oMo.repository.ContentRepository;
import com.stProjectTeam3.oMo.repository.MemberRepository;
import com.stProjectTeam3.oMo.repository.WatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class WatchService {

    private final WatchRepository watchRepository;

    private final MemberRepository memberRepository;

    private final ContentRepository contentRepository;

    public boolean check(String account, Long contentId, String type) throws Exception{
        try {
            Optional<Member> member = memberRepository.findByAccount(account);
            Optional<Content> content = contentRepository.findByIdAndTYPE(contentId, type);

            Optional<Watch> watchCheck = getWatch(member.get().getId(), content.get().getContentid());
            if (watchCheck.isEmpty()) {
                Watch watch = Watch.builder()
                        .userid(member.get().getId())
                        .contentid(content.get().getContentid())
                        .build();

                watchRepository.save(watch);

                return true;
            }
        }catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("잘못된 요청입니다.");
        }
        return false;
    }

    public boolean uncheck(String account, Long contentId, String type){
        Optional<Member> member = memberRepository.findByAccount(account);
        Optional<Content> content = contentRepository.findByIdAndTYPE(contentId, type);

        watchRepository.deleteByUseridAndContentid(member.get().getId(), content.get().getContentid());

        return true;
    }

    public Optional<Watch> getWatch(Long userId, Long contentId){
        return watchRepository.findByUseridAndContentid(userId, contentId);
    }

    public boolean getWatchedContent(String account, Long contentId, String type){
        Optional<Member> member = memberRepository.findByAccount(account);
        Optional<Content> content = contentRepository.findByIdAndTYPE(contentId, type);

        Optional<Watch> watchCheck = getWatch(member.get().getId(), content.get().getContentid());
        if(watchCheck.isEmpty()) return false;
        return true;
    }
}
