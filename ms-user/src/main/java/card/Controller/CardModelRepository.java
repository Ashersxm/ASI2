package main.java.card.Controller;

import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.user.model.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardModelRepository extends CrudRepository<CardModel, Integer> {
    List<CardModel> findByUser(UserModel u);
}
