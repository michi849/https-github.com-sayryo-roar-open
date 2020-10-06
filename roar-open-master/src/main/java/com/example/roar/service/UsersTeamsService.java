package com.example.roar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.example.roar.entity.UsersTeams;
import com.example.roar.entity.UsersTeamsRepository;

//データベースの操作メソッドをここで作成
@Service
@Transactional
public class UsersTeamsService {
    @Autowired
    UsersTeamsRepository usersTeamsRepository;

    public UsersTeams setUsersTeams(UsersTeams usersTeamsData) {
        UsersTeams usersTeams = new UsersTeams();
        usersTeams.setUid(usersTeamsData.getUid());
        usersTeams.setTeamId(usersTeamsData.getTeamId());
        usersTeams.setTeamName(usersTeamsData.getTeamName());
        return usersTeamsRepository.save(usersTeams);
    }

    public List<UsersTeams> getUsersTeams(String uid) {
        return usersTeamsRepository.findByUidIs(uid);
    }

    public void deleteUsersTeams(String uid, String teamId) {
        usersTeamsRepository.deleteByUidAndTeamId(uid, teamId);
    }
}
