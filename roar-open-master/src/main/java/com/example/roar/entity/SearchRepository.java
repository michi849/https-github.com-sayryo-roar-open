package com.example.roar.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

//エンティティ(クラス名)と主キー(ID)の型を指定
//「JpaRepository」にはCRUD操作の為の基本的なメソッドが定義されている
public interface SearchRepository extends JpaRepository<Search, Long> {

    // 「:引数名」でSQL内で使用できる。
    @Query(value = "SELECT "

            + "s.team_id as teamId," + " s.team_name AS teamName, " + " s.picture AS picture, "
            + " s.sport_name AS sportName, " + " s.prefectures AS prefectures, "
            + " s.activity_frequency AS activityFrequency, " + " s.day_of_the_week AS dayOfTheWeek, "
            + " s.team_concept AS teamConcept, " + " s.updated_at AS updatedAt, " + " count(s.team_id) as count "

            + " FROM search_info AS s " + " left join users_teams_info AS u ON s.team_id=u.teams_team_id "

            + " WHERE ( length(:teamId) = 0 OR s.team_id = :teamId) "
            + " AND ( length(:sportName) = 0 OR s.sport_name = :sportName) "
            + " AND ( length(:prefectures) = 0 OR s.prefectures = :prefectures) "
            + " AND ( length(:activityFrequency) = 0 OR s.activity_frequency = :activityFrequency) "
            + " AND ( length(:dayOfTheWeek) = 0 OR s.day_of_the_week = :dayOfTheWeek) "
            + " AND (length(:freeWord) = 0 OR MATCH (s.team_name,s.sport_name,s.prefectures,s.activity_frequency,s.day_of_the_week,s.team_concept) "
            + " AGAINST (:freeWord IN BOOLEAN MODE)) " + " GROUP BY s.team_id "
            + " ORDER BY s.updated_at DESC", nativeQuery = true)
    List<CustomSearch> findTeamSQL(String teamId, String sportName, String prefectures, String activityFrequency,
            String dayOfTheWeek, String freeWord);

    public static interface CustomSearch {
        // public String getUid();
        // ASを取得
        public long getCount();

        public long getTeamId();

        public String getTeamName();

        public String getPicture();

        public String getSportName();

        public String getPrefectures();

        public String getActivityFrequency();

        public String getDayOfTheWeek();

        public String getTeamConcept();
    }
}