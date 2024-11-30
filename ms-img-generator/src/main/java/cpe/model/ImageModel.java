package cpe.model;

import java.io.Serial;
import java.io.Serializable;

import cpe.config.*;
import cpe.controller.*;
import cpe.service.*;

public class ImageModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String promptTxt;
    private String negativePromptTxt;

    // Constructors, getters, and setters
    public ImageModel() {}

    public ImageModel(String promptTxt, String negativePromptTxt) {
        this.promptTxt = promptTxt;
        this.negativePromptTxt = negativePromptTxt;
    }

    public String getPromptTxt() {
        return promptTxt;
    }

    public void setPromptTxt(String promptTxt) {
        this.promptTxt = promptTxt;
    }

    public String getNegativePromptTxt() {
        return negativePromptTxt;
    }

    public void setNegativePromptTxt(String negativePromptTxt) {
        this.negativePromptTxt = negativePromptTxt;
    }
}
