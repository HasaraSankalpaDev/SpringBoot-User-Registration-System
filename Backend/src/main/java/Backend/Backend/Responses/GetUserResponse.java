package Backend.Backend.Responses;

import Backend.Backend.Model.UserModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class GetUserResponse {
    private boolean success;
    private String message;
    private UserModel user;

    public GetUserResponse(boolean success, String message, UserModel user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

}
