package com.hit.sys.service.impl;

import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.hit.common.utils.JwtUtil;
import com.hit.sys.entity.User;
import com.hit.sys.mapper.UserMapper;
import com.hit.sys.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Ruan
 * @since 2023-05-31
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Autowired      //自动将标注了@Autowired注解的依赖对象注入到需要使用它的类中
    private RedisTemplate redisTemplate;

    @Autowired
    private JwtUtil jwtUtil;

//    @Autowired      //增添密码加密后的方法
//    private PasswordEncoder passwordEncoder;
//
//    @Override
//    public Map<String, Object> login(User user) {
//        // 根据用户名查询
//        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
//        wrapper.eq(User::getUsername,user.getUsername());
//        User loginUser = this.baseMapper.selectOne(wrapper);
//
//        // 结果不为空，并且密码和传入密码匹配，则生成token，并将用户信息存入redis
//        if(loginUser != null && passwordEncoder.matches(user.getPassword(),loginUser.getPassword())){
//            // 暂时用UUID, 终极方案是jwt
//            String key = "user:" + UUID.randomUUID();
//
//            // 存入redis
//            loginUser.setPassword(null);
//            redisTemplate.opsForValue().set(key,loginUser,30, TimeUnit.MINUTES);
//
//            // 返回数据
//            Map<String, Object> data = new HashMap<>();
//            data.put("token",key);
//            return data;
//        }
//        return null;
//    }

    @Override       //老逻辑：无密码加密的
    public Map<String, Object> login(User user) {
        // 根据用户名和密码查询
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUsername,user.getUsername());
        wrapper.eq(User::getPassword,user.getPassword());
        User loginUser = this.baseMapper.selectOne(wrapper);
        // 结果不为空，则生成token，并将用户信息存入redis
        if(loginUser != null){
            // 暂时用UUID, 终极方案是jwt(用了jwt后可不用redis)
//            String key = "user:" + UUID.randomUUID();

            // 存入redis
            loginUser.setPassword(null);        //稍后做加密处理
//            redisTemplate.opsForValue().set(key,loginUser,30, TimeUnit.MINUTES);    //登录超时时间30分钟

            // 创建jwt
            String token = jwtUtil.createToken(loginUser);

            // 返回数据
            Map<String, Object> data = new HashMap<>();
            data.put("token",token);
            return data;
        }
        return null;
    }


    @Override
    public Map<String, Object> getUserInfo(String token) {
        // 根据token获取用户信息，redis
//        Object obj = redisTemplate.opsForValue().get(token);
        User loginUser = null;
        try {
            loginUser = jwtUtil.parseToken(token, User.class);

        } catch (Exception e) {
            e.printStackTrace();
        }

        if(loginUser != null){        //做一个反序列化
//            User loginUser = JSON.parseObject(JSON.toJSONString(obj),User.class);   //obj转化为json字符串
            Map<String, Object> data = new HashMap<>();
            data.put("name",loginUser.getUsername());
//            data.put("avatar", loginUser.getAvatar());

            // 角色
            List<String> roleList = this.baseMapper.getRoleNameByUserId(Math.toIntExact(loginUser.getUserId()));//这里转换为int
            data.put("roles",roleList);

            return data;
        }
        return null;
    }

    @Override
    public void logout(String token) {
//        redisTemplate.delete(token);      //redis不要用到注释掉
    }
}
