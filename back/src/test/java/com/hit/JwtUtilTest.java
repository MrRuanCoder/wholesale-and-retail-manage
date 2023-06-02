package com.hit;

import com.hit.common.utils.JwtUtil;
import com.hit.sys.entity.User;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * description: add a description [描述信息]
 *
 * @author Ruan [作者]
 * @version 1.0.0 [版本信息]
 * @date 2023/06/02 17:24:48 [时间，这里是年/月/日 时:分:秒的格式]
 */
@SpringBootTest
public class JwtUtilTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    public void testCreateJwt(){
        User user = new User();
        user.setUsername("zhangsan");
        user.setPhone("12399988877");
        String token = jwtUtil.createToken(user);
        System.out.println(token);
    }
    @Test
    public void testParseJwt(){ //注意下面这个token的过期时间，不然会出现测试类出错
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3NzA2YzE5Yy0zNmQ1LTRlMjMtYTYwZC0yNDk2MjY0ODg3MTUiLCJzdWIiOiJ7XCJwaG9uZVwiOlwiMTIzOTk5ODg4NzdcIixcInVzZXJuYW1lXCI6XCJ6aGFuZ3NhblwifSIsImlzcyI6InN5c3RlbSIsImlhdCI6MTY4NTY5ODQxNywiZXhwIjoxNjg1NzAwMjE3fQ.BF8v6VpDZw2DQ5bk92O5n9PJ76vGSzSY87jjfPFbnWM";//上面产生的token
        Claims claims = jwtUtil.parseToken(token);
        System.out.println(claims);
    }

    @Test
    public void testParseJwt2(){
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3NzA2YzE5Yy0zNmQ1LTRlMjMtYTYwZC0yNDk2MjY0ODg3MTUiLCJzdWIiOiJ7XCJwaG9uZVwiOlwiMTIzOTk5ODg4NzdcIixcInVzZXJuYW1lXCI6XCJ6aGFuZ3NhblwifSIsImlzcyI6InN5c3RlbSIsImlhdCI6MTY4NTY5ODQxNywiZXhwIjoxNjg1NzAwMjE3fQ.BF8v6VpDZw2DQ5bk92O5n9PJ76vGSzSY87jjfPFbnWM";//上面产生的token
        User user = jwtUtil.parseToken(token,User.class);      //可以快速得到user
        System.out.println(user);
    }



}
