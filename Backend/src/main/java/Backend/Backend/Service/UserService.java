package Backend.Backend.Service;

import Backend.Backend.DTO.ListUserDto;
import Backend.Backend.DTO.UpdateDTO;
import Backend.Backend.DTO.UserLoginDTO;
import Backend.Backend.DTO.UserRegistrationDTO;
import Backend.Backend.Exception.UserAlreadyExistsException;
import Backend.Backend.Model.UserModel;
import Backend.Backend.Repository.UserRepository;
import Backend.Backend.Responses.GetUserResponse;
import Backend.Backend.Responses.LoginResponse;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Getter
@Setter
@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final ModelMapper modelMapper;

    public UserService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    // Get All Users
    public List<ListUserDto> getAllUsers() {
        List<UserModel> userModelList = userRepository.findAll();
        return modelMapper.map(userModelList, new TypeToken<List<ListUserDto>>(){}.getType());
    }

    // Register User
    public String registerUser(UserRegistrationDTO registrationDTO) {
        UserModel existUser = userRepository.findByEmail(registrationDTO.getEmail());
        if (existUser != null){
            return "User already exists" ;
        } else {
            UserModel user = new UserModel();
            user.setUserName(registrationDTO.getUserName());
            user.setEmail(registrationDTO.getEmail());
            user.setPassword(registrationDTO.getPassword());
            user.setType(registrationDTO.getType());

            UserModel savedUser = userRepository.save(user);

            if (savedUser.getId() != null) {
                return "User Registered Successfully";
            } else {
                return "Server Error" ;
            }

        }
    }

    // User Login
    public LoginResponse  loginUser(UserLoginDTO loginDTO) {
        UserModel user = userRepository.findByEmail(loginDTO.getEmail());

        if (user == null) {
            return new LoginResponse(false, "User Not Found", null);
        }

        if (!loginDTO.getPassword().equals(user.getPassword())) {
            return new LoginResponse(false, "Password Incorrect", null);
        }

        return new LoginResponse(true, "Login Successful", user);


    }

    // Delete User
    public String deleteUser(Integer userId){
        Optional<UserModel> optionalUserModel = userRepository.findById(userId);

        if(optionalUserModel.isPresent()){
            userRepository.deleteById(userId);
            return "User Deleted Successfully";
        } else {
            throw new UserAlreadyExistsException("Can't Find User" );
        }
    }

    public UpdateDTO updateUser(Integer userId, UpdateDTO updateDTO) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (user != null){
            user.setUserName(updateDTO.getUserName());
            user.setEmail(updateDTO.getEmail());
            user.setPassword(updateDTO.getPassword());
            // Save the updated user
            return updateDTO;
        } else{
            throw new UserAlreadyExistsException("Can't Find User" );
        }


    }

    // Get BY ID
    public GetUserResponse getById(Integer userId) {
        UserModel user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return new GetUserResponse(false, "User Not Found", null);
        }

        return new GetUserResponse(true, "User  Found", user);
    }
}
