package com.hit.sys.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.User;
import com.hit.sys.entity.UserRole;
import com.hit.sys.service.IUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-05-31
 */
@Api(tags = {"用户接口列表"})     //swagger的注解，对 API 接口进行分组和分类
@RestController
@RequestMapping("/sys/user")
@CrossOrigin       //跨域处理
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired  //加密处理
    private PasswordEncoder passwordEncoder;

    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<User>> getAllUser(){
        List<User> list = userService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("用户登录")
    @PostMapping("/login")
    public Result<Map<String,Object>> login(@RequestBody User user){
        Map<String,Object> data = userService.login(user);
        if(data != null){
            return Result.success(data);
        }
        return Result.fail(20002,"用户名或密码错误");
    }


    @GetMapping("/info")
    public Result<Map<String,Object>> getUserInfo(@RequestParam("token") String token){
        // 根据token获取用户信息，redis
        Map<String,Object> data = userService.getUserInfo(token);
        if(data != null){
            return Result.success(data);
        }
        return Result.fail(20003,"登录信息无效，请重新登录");
    }

    @ApiOperation("登出方法")
    @PostMapping("/logout")
    public Result<?> logout(@RequestHeader("Authorization") String token){    //注意这个token的名字，需要前端token的响应
        userService.logout(token);
        return Result.success();
    }

    @GetMapping("/list")        //查询
    public Result<Map<String,Object>> getUserList(@RequestParam(value = "username",required = false) String username,
                                                  @RequestParam(value = "phone",required = false) String phone,
                                                  @RequestParam(value = "pageNo") Long pageNo,
                                                  @RequestParam(value = "pageSize") Long pageSize){     //可加一个address，pageno分页，pagesize每页多少条

        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();      //条件构造器，构建数据库查询条件，它是通过 Lambda 表达式来实现
        wrapper.eq(StringUtils.hasLength(username),User::getUsername,username);
        wrapper.eq(StringUtils.hasLength(phone),User::getPhone,phone);
        wrapper.orderByDesc(User::getUserId);    //按id降序

        Page<User> page = new Page<>(pageNo,pageSize);  //可查看这个页和上游页
        userService.page(page,wrapper);

        Map<String,Object> data = new HashMap<>();
        data.put("total",page.getTotal());      //返回的前后端约定的参数（这里的total是符合条件的总数据）
        data.put("rows",page.getRecords());

        return Result.success(data);

    }

    @PostMapping("/add")      //原始
    public Result<?> addUser(@RequestBody User user){   //HTTP请求的请求体解析为一个User的java对象
        user.setPassword(passwordEncoder.encode(user.getPassword()));   //密码加密
        userService.save(user);
        return Result.success("新增用户成功");
    }

//    @PostMapping("/add")
//    public Result<?> addUser(@RequestBody User user){   //HTTP请求的请求体解析为一个User的java对象
//        user.setPassword(passwordEncoder.encode(user.getPassword()));   //密码加密
//        userService.save(user);
//
//        UserRole userRole = new UserRole();
//        userRole.setUserId(user.getUserId()); // 设置关联的user_id
//        userRole.setRoleId(user.getRoleId()); // 设置关联的role_id
//        userRoleService.save(userRole);
//
//        return Result.success("新增用户成功");
//    }

    @PutMapping
    public Result<?> updateUser(@RequestBody User user){
        user.setPassword(null);             //真需要和前端交互，或改为下面类似使用id的方法(看运行时的语句，就知道缺少了哪些东西（where后面
        userService.updateById(user);       //已传入的字段如果为空，该字段是不会更新的
        return Result.success("修改用户成功");
//        if (user.getUserId() == null) {
//            return Result.fail(20003, "用户ID为空");
//        }
//        userService.updateById(user);
//        return Result.success("修改用户成功");
    }

    @GetMapping("/{id}")    //通过id查到用户数据
    public Result<User> getUserById(@PathVariable("id") Integer id){
        User user = userService.getById(id);
        return Result.success(user);
    }

    @DeleteMapping("/{id}")
    public Result<User> deleteUserById(@PathVariable("id") Integer id){
        userService.removeById(id);
        return Result.success("删除用户成功");
    }

}
