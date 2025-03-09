package Backend.Backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    private String userName;
    private String email;
    private String password;
    private String type;
}