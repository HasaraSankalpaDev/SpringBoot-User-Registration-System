package Backend.Backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListUserDto {
    private  Long id;
    private String userName;
    private String email;
    private String type;

}