package cpe.model;

public class TextRequest {
    private String promptTxt;
    private String negativePromptTxt;

    // Constructors, getters, and setters
    public TextRequest(String promptTxt, String negativePromptTxt) {
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