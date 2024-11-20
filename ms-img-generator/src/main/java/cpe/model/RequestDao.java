package cpe.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RequestDao {

    private final List<ImageRequest> requestList;

    public RequestDao(){
        this.requestList=new ArrayList<>();
    }

    public void addRequest(ImageRequest request){
        this.requestList.add(request);
    }

    public List<ImageRequest> getAllRequest(){
        return this.requestList;
    }

}
