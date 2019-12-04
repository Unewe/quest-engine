package com.unewej.questengine.service;

import com.unewej.questengine.model.Role;
import com.unewej.questengine.model.RoleName;
import com.unewej.questengine.model.User;
import com.unewej.questengine.repository.RoleRepository;
import com.unewej.questengine.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean existsByUsername(String userName) {
        return userRepository.existsByUsername(userName);
    }

    public boolean existsByEmail(String userName) {
        return userRepository.existsByEmail(userName);
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new NullPointerException("User Role not set."));
        user.setRoles(Collections.singleton(userRole));
        return userRepository.save(user);
    }
}
