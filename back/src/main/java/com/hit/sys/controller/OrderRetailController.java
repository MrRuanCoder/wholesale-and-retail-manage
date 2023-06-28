package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.Customer;
import com.hit.sys.entity.OrderRetail;
import com.hit.sys.service.impl.CustomerServiceImpl;
import com.hit.sys.service.impl.OrderRetailServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * <p>
 * 零售订单表 前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-06-27
 */
@RestController
@RequestMapping("/sys/orderRetail")
@CrossOrigin
public class OrderRetailController {
    @Autowired
    private OrderRetailServiceImpl orderRetailServiceService;

    @ApiOperation("查询零售单所有信息")
    @GetMapping("/all")
    public Result<List<OrderRetail>> getAllOrderRetail(){
        List<OrderRetail> list = orderRetailServiceService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("新增零售单")
    @PostMapping("/add")
    public Result<?> addOrderRetail(@RequestBody OrderRetail customer){   //HTTP请求的请求体解析为一个User的java对象
        orderRetailServiceService.save(customer);
        return Result.success("新增客户成功");
    }

    @ApiOperation("修改零售单信息")
    @PutMapping
    public Result<?> updateOrderRetail(@RequestBody OrderRetail customer){
        orderRetailServiceService.updateById(customer);
        return Result.success("修改客户成功");
    }


    @ApiOperation("通过id查询零售单")
    @GetMapping("/{id}")    //通过id查到用户数据
    public Result<OrderRetail> getOrderRetailById(@PathVariable("id") Integer id){
        OrderRetail customer = orderRetailServiceService.getById(id);
        return Result.success(customer);
    }

    @ApiOperation("通过id删除客户")
    @DeleteMapping("/{id}")
    public Result<OrderRetail> deleteOrderRetailById(@PathVariable("id") Integer id){
        orderRetailServiceService.removeById(id);
        return Result.success("删除客户成功");
    }

}
