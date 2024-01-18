package com.jwt.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USER_TBL")
public class User {
    @Id
    private int id;
    private String userName;
    private String password;
    private String email;
    
    public User() {
        // Costruttore vuoto richiesto da Hibernate
    }
    
    public User(int id, String userName, String password, String email) {
    	this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }
    
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
	public String getUserName() {
		// TODO Auto-generated method stub
		return userName;
	}
}
