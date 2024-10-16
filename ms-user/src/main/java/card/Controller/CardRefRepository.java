package main.java.card.Controller;

import com.cpe.springboot.card.model.CardReference;
import org.springframework.data.repository.CrudRepository;

public interface CardRefRepository extends CrudRepository<CardReference, Integer> {

}
