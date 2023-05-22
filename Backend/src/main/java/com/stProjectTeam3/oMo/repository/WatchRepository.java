package com.stProjectTeam3.oMo.repository;

import com.stProjectTeam3.oMo.entity.Watch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Repository
public interface WatchRepository extends JpaRepository<Watch, Long> {

    Optional<Watch> findByUseridAndContentid(@Param(value = "userid") Long userid, @Param(value = "contentid") Long contentid);

    void deleteByUseridAndContentid(@Param(value = "userid") Long userid, @Param(value = "contentid") Long contentid);
}
