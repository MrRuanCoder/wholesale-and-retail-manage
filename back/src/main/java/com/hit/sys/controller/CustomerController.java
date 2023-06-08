package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.Customer;
import com.hit.sys.entity.Goods;
import com.hit.sys.entity.User;
import com.hit.sys.service.impl.CustomerServiceImpl;
import com.hit.sys.service.impl.GoodsServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * <p>
 * 客户表 前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-06-08
 */
@RestController
@RequestMapping("/sys/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerServiceImpl customerService;

    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<Customer>> getAllCustomer(){
        List<Customer> list = customerService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("新增客户")
    @PostMapping("/add")
    public Result<?> addCustomer(@RequestBody Customer customer){   //HTTP请求的请求体解析为一个User的java对象
        customerService.save(customer);
        return Result.success("新增商品成功");
    }

    @ApiOperation("修改商品信息")
    @PutMapping
    public Result<?> updateCustomer(@RequestBody Customer customer){
        customerService.updateById(customer);
        return Result.success("修改商品成功");
    }


    @ApiOperation("通过id查询用户数据")
    @GetMapping("/{id}")    //通过id查到用户数据
    public Result<Customer> getUserById(@PathVariable("id") Integer id){
        Customer customer = customerService.getById(id);
        return Result.success(customer);
    }

    @ApiOperation("通过id删除用户")
    @DeleteMapping("/{id}")
    public Result<Customer> deleteUserById(@PathVariable("id") Integer id){
        customerService.removeById(id);
        return Result.success("删除用户成功");
    }
}
