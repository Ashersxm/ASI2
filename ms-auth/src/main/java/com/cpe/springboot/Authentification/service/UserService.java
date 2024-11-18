package com.cpe.springboot.Authentification.service;

import com.cpe.springboot.Authentification.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${user.service.url}")
    private String userServiceUrl;
    
    public List<UserModel> getUserByLoginPwd(String login, String pwd) {        
        String url = userServiceUrl + "/users";
        
        // Récupérer tous les utilisateurs depuis l'API
        ResponseEntity<UserModel[]> response = restTemplate.getForEntity(url, UserModel[].class);
        
        if (response.getStatusCode() == HttpStatus.OK) {
            UserModel[] users = response.getBody();

            if (users != null) {
                return Arrays.stream(users)
                        .filter(user -> login.equals(user.getLogin()) && pwd.equals(user.getPwd()))
                        .collect(Collectors.toList());
            }
        }
        
        return Collections.emptyList(); // Retourner une liste vide si aucun utilisateur ne correspond
    }
}