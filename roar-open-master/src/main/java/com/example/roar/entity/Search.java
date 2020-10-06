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
@Table(name = "search_info")
public class Search {
    @Id // 主キーを示す
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private long teamId;
    // チーム名
    @Column(nullable = false, name = "team_name")
    private String teamName;
    // チーム写真
    @Column(name = "picture")
    private String picture;
    // 競技名
    @Column(name = "sport_name")
    private String sportName;
    // 活動地域
    @Column(name = "prefectures")
    private String prefectures;
    // 活動頻度
    @Column(name = "activity_frequency")
    private String activityFrequency;
    // 活動曜日
    @Column(name = "day_of_the_week")
    private String dayOfTheWeek;
    // チームコンセプト
    @Column(name = "team_concept")
    private String teamConcept;
    // 更新日時
    // @Column(name = "updated_at")
    // private String updatedAt;
}