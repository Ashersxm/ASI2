package main.java.controller;

import com.cpe.springboot.user.model.UserModel;
import org.springframework.data.repository.CrudRepository;

@EnableJms
@SpringBootApplication

public class Main {
    @Autowired
    JmsTemplate jmsTemplate;

    /**
     * Executed after application start
     */
    @EventListener(ApplicationReadyEvent.class)
    public void doInitAfterStartup() {
        //enable to be in topic mode! to do at start
        jmsTemplate.setPubSubDomain(true);
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}