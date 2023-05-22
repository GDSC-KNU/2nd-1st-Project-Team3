package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.Member;
import com.stProjectTeam3.oMo.dto.SearchResultDto;
import com.stProjectTeam3.oMo.entity.Content;
import com.stProjectTeam3.oMo.entity.ContentLike;
import com.stProjectTeam3.oMo.entity.Watch;
import com.stProjectTeam3.oMo.repository.ContentLikeRepository;
import com.stProjectTeam3.oMo.repository.ContentRepository;
import com.stProjectTeam3.oMo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ContentLikeService {

    private final ContentLikeRepository contentLikeRepository;

    private final MemberRepository memberRepository;

    private final ContentRepository contentRepository;

    public boolean check(String account, Long contentId, String type) throws Exception{
        try{
            Optional<Member> member = memberRepository.findByAccount(account);
            Optional<Content> content = contentRepository.findByIdAndTYPE(contentId, type);

            Optional<ContentLike> likeCheck = getLike(member.get().getId(), content.get().getContentid());

            if(likeCheck.isEmpty()){
                ContentLike contentLike = ContentLike.builder()
                        .userid(member.get().getId())
                        .contentid(content.get().getContentid())
                        .build();

                contentLikeRepository.save(contentLike);

                return true;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new Exception("잘못된 요청입니다.");
        }
        return false;
    }

    public boolean uncheck(String account, Long contentId, String type){
        Optional<Member> member = memberRepository.findByAccount(account);
        Optional<Content> content = contentRepository.findByIdAndTYPE(contentId, type);

        contentLikeRepository.deleteByUseridAndContentid(member.get().getId(), content.get().getContentid());

        return true;
    }

    public Optional<ContentLike> getLike(Long userId, Long contentId){
        return contentLikeRepository.findByUseridAndContentid(userId, contentId);
    }

    public List<Content> getAllLike(String account){
        Optional<Member> member = memberRepository.findByAccount(account);
        List<Content> result = new ArrayList<>();
        List<ContentLike> likeList = contentLikeRepository.findAllByUserid(member.get().getId());

        for(ContentLike ll : likeList){
            Optional<Content> content = contentRepository.findByContentid(ll.getContentid());
            if(!content.isEmpty()){
                result.add(content.get());
            }
        }
        return result;
    }

    public boolean getLikedContent(String account, Long contentId, String type){
        Optional<Member> member = memberRepository.findByAccount(account);
        Optional<Content> content = contentRepository.findByIdAndTYPE(contentId, type);

        Optional<ContentLike> likeCheck = getLike(member.get().getId(), content.get().getContentid());

        if(likeCheck.isEmpty()) return false;
        return true;
    }
}
