package com.hit.sys.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.Role;
import com.hit.sys.entity.User;
import com.hit.sys.service.IRoleService;
import com.hit.sys.service.IUserService;
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
 * role说明表 前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-05-31
 */
@RestController   //记得该rest
@RequestMapping("/sys/role")
@CrossOrigin
public class RoleController {
    @Autowired
    private IRoleService roleService;

    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<Role>> getAllRole(){
        List<Role> list = roleService.list();
        return Result.success(list,"查询成功");
    }


    @GetMapping("/list")        //查询
    public Result<Map<String,Object>> getRoleList(@RequestParam(value = "rolename",required = false) String rolename,   //需要加roleId，不然会失效
                                                  @RequestParam(value = "pageNo") Long pageNo,                          //也可以给数据库主键role_id加上自增，传数据就不会报错
                                                  @RequestParam(value = "pageSize") Long pageSize){     //可加一个address，pageno分页，pagesize每页多少条

        LambdaQueryWrapper<Role> wrapper = new LambdaQueryWrapper<>();      //条件构造器，构建数据库查询条件，它是通过 Lambda 表达式来实现
        wrapper.eq(StringUtils.hasLength(rolename),Role::getRoleName,rolename);
        wrapper.orderByDesc(Role::getRoleId);    //按id降序

        Page<Role> page = new Page<>(pageNo,pageSize);  //可查看这个页和上游页
        roleService.page(page,wrapper);                 //分页查询

        Map<String,Object> data = new HashMap<>();
        data.put("total",page.getTotal());      //返回的前后端约定的参数（这里的total是符合条件的总数据）
        data.put("rows",page.getRecords());

        return Result.success(data);

    }

    @PostMapping
    public Result<?> addRole(@RequestBody Role role){   //HTTP请求的请求体解析为一个User的java对象
        roleService.save(role);        //个人暂时没有设置add角色方法
        return Result.success("新增角色成功");
    }



    @PutMapping
    public Result<?> updateRole(@RequestBody Role role){    //必须通过roleId来进行修改
        roleService.updateById(role);       //修改也暂时未新增
        return Result.success("修改用户成功");
    }

    @GetMapping("/{id}")    //通过id查到role
    public Result<Role> getRoleById(@PathVariable("id") Integer id){
        Role role = roleService.getById(id);
        return Result.success(role);
    }

    @DeleteMapping("/{id}")
    public Result<User> deleteRoleById(@PathVariable("id") Integer id){
        roleService.removeById(id);
        return Result.success("删除角色成功");
    }
}
