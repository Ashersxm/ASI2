package main.java.store.controller;

import com.cpe.springboot.store.model.StoreTransaction;
import org.springframework.data.repository.CrudRepository;

public interface StoreRepository extends CrudRepository<StoreTransaction, Integer> {
	

}
