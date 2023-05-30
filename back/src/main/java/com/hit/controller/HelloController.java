package com.hit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * description: add a description [描述信息]
 *
 * @author Ruan [作者]
 * @version 1.0.0 [版本信息]
 * @date 2023/05/30 12:44:23 [时间，这里是年/月/日 时:分:秒的格式]
 */
@Controller
public class HelloController {
    @RequestMapping("/test")
    @ResponseBody
    public String hello() {
        return "Hello Spring Boot!";
    }
}
