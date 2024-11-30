package cpe.model;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import cpe.config.*;
import cpe.controller.*;
import cpe.service.*;

@Repository
public class RequestDao {

    private List<ImageModel> requests = new ArrayList<>();

    public void addRequest(ImageModel request) {
        requests.add(request);
    }

    public List<ImageModel> getRequests() {
        return requests;
    }
}
