package Backend.Backend.Controller;

import Backend.Backend.DTO.ListUserDto;
import Backend.Backend.DTO.UpdateDTO;
import Backend.Backend.DTO.UserLoginDTO;
import Backend.Backend.DTO.UserRegistrationDTO;
import Backend.Backend.Model.UserModel;
import Backend.Backend.Responses.GetUserResponse;
import Backend.Backend.Responses.LoginResponse;
import Backend.Backend.Service.UserService;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Getter
@Setter
@RequestMapping("/api/v1/")

public class UserController {
    @Autowired
    private UserService userService;

    // Get All Users
    @GetMapping("/getAllUsers")
    public List<ListUserDto> getAllUsers(){
        return userService.getAllUsers();
    }

    // Register
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDTO registrationDTO) {
        String responseMessage = userService.registerUser(registrationDTO);
        return ResponseEntity.ok(responseMessage);
    }


    // Login
    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody UserLoginDTO loginDTO){
        // Store Exist User To Variable
        LoginResponse loggedUser = userService.loginUser(loginDTO);


        if (loggedUser.isSuccess()){
            return new LoginResponse(true, "User Found", loggedUser.getUser());
        } else {
            return new LoginResponse(true, "User Not Found", null);

        }
    }

    // Delete

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer userId) {
        String deletedUser = userService.deleteUser(userId);
        return ResponseEntity.ok(deletedUser);
    }

    // Update

    @PutMapping("/update/{userId}")
    public ResponseEntity<UpdateDTO> updateUser(@PathVariable Integer userId, @RequestBody UpdateDTO updateDTO) {
        UpdateDTO updatedUser = userService.updateUser(userId, updateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    // Get User by Id
    @GetMapping("/getById/{userId}")
    public GetUserResponse getById(@PathVariable Integer userId){
        // Store Exist User To Variable
        GetUserResponse getUser = userService.getById(userId);


        if (getUser.isSuccess()){
            return new GetUserResponse(true, "User Found", getUser.getUser());
        } else {
            return new GetUserResponse(true, "User Not Found", null);

        }
    }

}
