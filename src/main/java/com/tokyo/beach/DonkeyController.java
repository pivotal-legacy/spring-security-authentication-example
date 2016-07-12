package com.tokyo.beach;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class DonkeyController {
    @RequestMapping(value = "/api/donkey")
    public Map<String, String> session() {
        return Collections.singletonMap("donkey", "roba");
    }
}
