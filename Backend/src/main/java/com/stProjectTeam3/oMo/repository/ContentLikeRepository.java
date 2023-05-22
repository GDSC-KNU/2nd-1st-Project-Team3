package com.stProjectTeam3.oMo.repository;

import com.stProjectTeam3.oMo.entity.ContentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public interface ContentLikeRepository extends JpaRepository<ContentLike, Long> {

    Optional<ContentLike> findByUseridAndContentid(@Param(value = "userid") Long userid, @Param(value = "contentid") Long contentid);

    void deleteByUseridAndContentid(@Param(value = "userid") Long userid, @Param(value = "contentid") Long contentid);

    List<ContentLike> findAllByUserid(@Param(value = "userid") Long userid);
}
