package Backend.Backend.Responses;

import Backend.Backend.Model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter

public class LoginResponse {
    private boolean success;
    private String message;
    private UserModel user;

    public LoginResponse(boolean success, String message, UserModel user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

    // Getters and setters
}
