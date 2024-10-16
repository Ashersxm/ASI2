package main.java.user.controller;

import com.cpe.springboot.user.model.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<UserModel, Integer> {
	
	List<UserModel> findByLoginAndPwd(String login,String pwd);

}
