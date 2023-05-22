package com.stProjectTeam3.oMo.repository;

import com.stProjectTeam3.oMo.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    Optional<Content> findByContentid(Long contentid);

    @Query("select c from Content c where c.id = :id and c.media_type = :type")
    Optional<Content> findByIdAndTYPE(@Param(value = "id") Long id, @Param(value = "type") String type);
}
