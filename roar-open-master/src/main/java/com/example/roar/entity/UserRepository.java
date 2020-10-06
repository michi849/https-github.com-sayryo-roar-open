package com.example.roar.entity;

import org.springframework.data.jpa.repository.JpaRepository;

//エンティティ(クラス名)と主キー(ID)の型を指定
//「JpaRepository」にはCRUD操作の為の基本的なメソッドが定義されている
public interface UserRepository extends JpaRepository<User, String> {

    // UIDの完全一致 SELECT * FROM users_info WHERE uid = ?1
    User findByUidIs(String uid);
}