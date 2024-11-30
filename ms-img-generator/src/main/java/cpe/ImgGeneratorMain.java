package cpe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import cpe.config.*;
import cpe.controller.*;
import cpe.model.*;
import cpe.service.*;


@SpringBootApplication
public class ImgGeneratorMain {

    public static void main(String[] args) {
        SpringApplication.run(ImgGeneratorMain.class, args);
    }
}
