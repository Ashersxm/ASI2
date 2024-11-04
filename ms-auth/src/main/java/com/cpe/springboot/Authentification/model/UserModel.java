package com.cpe.springboot.Authentification.model;

public class UserModel {
    private Integer id;
    private String login;
    private String pwd;

    // Constructeur
    public UserModel(Integer id, String login, String pwd) {
        this.id = id;
        this.login = login;
        this.pwd = pwd;
    }

    // Getters et setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
