package com.stProjectTeam3.oMo.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentid;

    private Long id;
    private String original_title;
    private String title;
    private String date;
    private String media_type;
    private String poster_path;
}
