package com.cpe.springboot.user.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.cpe.springboot.card.Controller.CardModelService;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.common.tools.DTOMapper;
import com.cpe.springboot.user.model.AuthDTO;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final CardModelService cardModelService;

	@Autowired
    private RestTemplate restTemplate;

    @Value("${auth.service.url}")
    private String authServiceUrl;

	public UserService(UserRepository userRepository, CardModelService cardModelService) {
		this.userRepository = userRepository;
		this.cardModelService = cardModelService;
	}

	public List<UserModel> getAllUsers() {
		List<UserModel> userList = new ArrayList<>();
		userRepository.findAll().forEach(userList::add);
		return userList;
	}

	public Optional<UserModel> getUser(String id) {
		return userRepository.findById(Integer.valueOf(id));
	}

	public Optional<UserModel> getUser(Integer id) {
		return userRepository.findById(id);
	}

	public UserDTO addUser(UserDTO user) {
		UserModel u = fromUDtoToUModel(user);
		// needed to avoid detached entity passed to persist error
		UserModel u_saved=userRepository.save(u);
		List<CardModel> cardList = cardModelService.getRandCard(5);
		for (CardModel card : cardList) {
			u.addCard(card);
		}
		UserModel uBd = userRepository.save(u_saved);
		return DTOMapper.fromUserModelToUserDTO(uBd);
	}

	public UserDTO updateUser(UserDTO user) {
		UserModel u = fromUDtoToUModel(user);
		UserModel uBd =userRepository.save(u);
		return DTOMapper.fromUserModelToUserDTO(uBd);
	}

	public UserDTO updateUser(UserModel user) {
		UserModel uBd = userRepository.save(user);
		return DTOMapper.fromUserModelToUserDTO(uBd);
	}

	public void deleteUser(String id) {
		userRepository.deleteById(Integer.valueOf(id));
	}

	public List<UserModel> getUserByLoginPwd(String login, String pwd) {
		List<UserModel> ulist = null;
		ulist = userRepository.findByLoginAndPwd(login, pwd);
		return ulist;
	}

	private UserModel fromUDtoToUModel(UserDTO user) {
		UserModel u = new UserModel(user);
		List<CardModel> cardList = new ArrayList<CardModel>();
		for (Integer cardId : user.getCardList()) {
			Optional<CardModel> card = cardModelService.getCard(cardId);
			if (card.isPresent()) {
				cardList.add(card.get());
			}
		}
		return u;
	}

	public Integer authenticate(AuthDTO authDTO) {
		try {
			// Envoyer la requête POST à l'API d'authentification
			ResponseEntity<Integer> response = restTemplate.postForEntity(authServiceUrl, authDTO, Integer.class);

			// Si l'authentification réussit, retourner l'utilisateur
			if (response.getStatusCode() == HttpStatus.OK) {
				return response.getBody();
			} else {
				throw new RuntimeException("Authentication failed with status: " + response.getStatusCode());
			}
		} catch (HttpClientErrorException e) {
			throw new RuntimeException("Error during authentication: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
		} catch (Exception e) {
			throw new RuntimeException("Unexpected error during authentication: " + e.getMessage());
		}
	}
}
