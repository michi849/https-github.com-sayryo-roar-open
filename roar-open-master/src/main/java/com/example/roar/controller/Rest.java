package com.example.roar.controller;

import java.util.List;

import com.example.roar.entity.News;
import com.example.roar.entity.Search;
import com.example.roar.entity.SearchRepository;
import com.example.roar.entity.User;
import com.example.roar.entity.UsersTeams;
import com.example.roar.entity.SearchRepository.CustomSearch;
import com.example.roar.service.SearchService;
import com.example.roar.service.UserService;
import com.example.roar.service.UsersTeamsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
// @CrossOrigin("https://roar-b54b1.web.app")
@RequestMapping("/api")

public class Rest {

    // test
    @GetMapping("/test")
    public String test() {
        System.out.println("testAPI受信");
        return "成功";
    }

    // 以下「users_info」テーブルAPI
    @Autowired
    UserService userService;

    // プロフィール取得
    @GetMapping("/profile/{uid}")
    public User profileUid(@PathVariable("uid") String uidData) {
        return userService.getProfile(uidData);
    }

    // プロフィール登録・更新
    @PostMapping("/profile")
    public User profile(@RequestBody User profileData) {
        return userService.setProfile(profileData);
    }

    // 以下「search_info」テーブルAPI
    @Autowired
    SearchRepository searchRepository;

    // チーム検索で取得
    @GetMapping("/search") // @RequestParamを省略
    public List<CustomSearch> search(String teamId, String sportName, String prefectures, String activityFrequency,
            String dayOfTheWeek, String freeWord) {
        return searchRepository.findTeamSQL(teamId, sportName, prefectures, activityFrequency, dayOfTheWeek, freeWord);
    }

    @Autowired
    SearchService searchService;

    // チーム登録
    @PostMapping("/search")
    public Search search(@RequestBody Search teamData) {
        return searchService.setTeam(teamData);
    }

    // チーム更新
    @PutMapping("/search")
    public Search putSearch(@RequestBody Search teamData) {
        return searchService.putTeam(teamData);
    }

    // 以下「users_teams_info」テーブルAPI
    @Autowired
    UsersTeamsService usersTeamsService;

    // チーム参加登録
    @PostMapping("/usersTeams")
    public UsersTeams usersTeams(@RequestBody UsersTeams usersTeamsData) {
        return usersTeamsService.setUsersTeams(usersTeamsData);
    }

    // チーム退会
    @DeleteMapping("/usersTeams")
    public String usersTeamsDelete(String uid, String teamId) {
        usersTeamsService.deleteUsersTeams(uid, teamId);
        return "OK";
    }

    @DeleteMapping("/usersTeamsA")
    public String usersTeamsDedlete(String uid, String teamId) {
        System.out.println(uid + teamId);
        return uid + teamId;
    }

    // 所属チームリスト取得
    @GetMapping("/usersTeams/{uid}")
    public List<UsersTeams> usersTeamsUid(@PathVariable("uid") String usersTeamsUidData) {
        return usersTeamsService.getUsersTeams(usersTeamsUidData);
    }

    // ニュースAPI取得
    @GetMapping("/news")
    public String newsDate() {
        News news = new News();
        return news.getNewsJson();
    }

    // @PathParamで/rest/{keyword}? ⇒パスパラメータ{keyword}を取得
    // @RequestParamで/rest?keyword=Java&limit=10 ⇒クエリパラメータJava,10を取得
    // GET受信パターン
    // @GetMapping("/login")
    // public String getAll(@RequestParam("address") String address,
    // @RequestParam("password") String password) {
    // System.out.println("address=" + address + ", password=" + password);
    // return "OK";
    // }
}