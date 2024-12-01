package com.cpe.springboot.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthDTO {
    @JsonProperty("login")
    private String login;

    @JsonProperty("pwd")
    private String pwd;
	
	public AuthDTO() {
	}

	public String getlogin() {
		return login;
	}

	public void setlogin(String login) {
		this.login = login;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
}
