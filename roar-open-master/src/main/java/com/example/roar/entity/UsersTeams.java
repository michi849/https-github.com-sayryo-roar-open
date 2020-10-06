package com.example.roar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;

import lombok.Data;

@Entity // JPAのエンティティであることを示す。DBで使用するオブジェクトをエンティティ。フィールド=カラム。
@Data
@Table(name = "users_teams_info")
public class UsersTeams {
    @Id // 主キーを示す
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    // uid
    @Column(name = "teams_uid", nullable = false)
    private String uid;
    // チームID
    @Column(name = "teams_team_id")
    private String teamId;
    // チーム名
    @Column(name = "teams_team_name")
    private String teamName;
}