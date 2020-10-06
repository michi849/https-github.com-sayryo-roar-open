package com.example.roar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.roar.entity.Search;
import com.example.roar.entity.SearchRepository;

//データベースの操作メソッドをここで作成
@Service
@Transactional
public class SearchService {
    @Autowired
    SearchRepository searchRepository;

    public Search setTeam(Search teamData) {
        Search search = new Search();
        search.setTeamName(teamData.getTeamName());
        search.setPicture(teamData.getPicture());
        search.setSportName(teamData.getSportName());
        search.setPrefectures(teamData.getPrefectures());
        search.setActivityFrequency(teamData.getActivityFrequency());
        search.setDayOfTheWeek(teamData.getDayOfTheWeek());
        search.setTeamConcept(teamData.getTeamConcept());
        return searchRepository.save(search);
    }

    public Search putTeam(Search teamData) {
        Search search = new Search();
        search.setTeamId(teamData.getTeamId());
        search.setTeamName(teamData.getTeamName());
        search.setPicture(teamData.getPicture());
        search.setSportName(teamData.getSportName());
        search.setPrefectures(teamData.getPrefectures());
        search.setActivityFrequency(teamData.getActivityFrequency());
        search.setDayOfTheWeek(teamData.getDayOfTheWeek());
        search.setTeamConcept(teamData.getTeamConcept());
        return searchRepository.save(search);
    }
}