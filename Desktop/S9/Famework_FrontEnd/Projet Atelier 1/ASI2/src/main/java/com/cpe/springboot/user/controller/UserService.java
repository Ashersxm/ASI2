package com.cpe.springboot.user.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.cpe.springboot.card.Controller.CardModelService;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.common.tools.DTOMapper;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CardModelService cardModelService;
    private final JmsTemplate jmsTemplate;

    @Autowired
    public UserService(UserRepository userRepository, CardModelService cardModelService, JmsTemplate jmsTemplate) {
        this.userRepository = userRepository;
        this.cardModelService = cardModelService;
        this.jmsTemplate = jmsTemplate;
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
        UserModel u_saved = userRepository.save(u);
        
        // Ajout de cartes au nouvel utilisateur
        List<CardModel> cardList = cardModelService.getRandCard(5);
        for (CardModel card : cardList) {
            u.addCard(card);
        }
        UserModel uBd = userRepository.save(u_saved);

        // Notification pour l'ajout de l'utilisateur
        jmsTemplate.convertAndSend("user.notifications", "Nouvel utilisateur ajouté : " + uBd.getId());

        return DTOMapper.fromUserModelToUserDTO(uBd);
    }

    public UserDTO updateUser(UserDTO user) {
        UserModel u = fromUDtoToUModel(user);
        UserModel uBd = userRepository.save(u);
        
        // Notification pour la mise à jour de l'utilisateur
        jmsTemplate.convertAndSend("user.notifications", "Utilisateur mis à jour : " + uBd.getId());

        return DTOMapper.fromUserModelToUserDTO(uBd);
    }

    public UserDTO updateUser(UserModel user) {
        UserModel uBd = userRepository.save(user);

        // Notification pour la mise à jour de l'utilisateur
        jmsTemplate.convertAndSend("user.notifications", "Utilisateur mis à jour : " + uBd.getId());

        return DTOMapper.fromUserModelToUserDTO(uBd);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(Integer.valueOf(id));

        // Notification pour la suppression de l'utilisateur
        jmsTemplate.convertAndSend("user.notifications", "Utilisateur supprimé : ID " + id);
    }

    public List<UserModel> getUserByLoginPwd(String login, String pwd) {
        return userRepository.findByLoginAndPwd(login, pwd);
    }

    private UserModel fromUDtoToUModel(UserDTO user) {
        UserModel u = new UserModel(user);
        List<CardModel> cardList = new ArrayList<>();
        for (Integer cardId : user.getCardList()) {
            Optional<CardModel> card = cardModelService.getCard(cardId);
            card.ifPresent(cardList::add);
        }
        u.addAllCardList(cardList); // Assurez-vous d'avoir un setter pour les cartes dans UserModel
        return u;
    }
}
