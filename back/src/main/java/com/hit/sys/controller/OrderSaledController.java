package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.OrderSaled;
import com.hit.sys.entity.User;
import com.hit.sys.service.impl.OrderSaledServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;
import java.util.List;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-06-28
 */
@RestController
@RequestMapping("/sys/orderSaled")
@CrossOrigin
public class OrderSaledController {
    @Autowired
    private OrderSaledServiceImpl orderSaledServiceService;

    @ApiOperation("查询销售单所有信息（单条数据)")
    @GetMapping("/all")
    public Result<List<OrderSaled>> getAllOrderSaled(){
        List<OrderSaled> list = orderSaledServiceService.list();
//        List<OrderSaled> list = orderSaledServiceService.list().stream().distinct().collect(Collectors.toList());   //
        return Result.success(list,"查询成功");
    }

    @ApiOperation("查询销售单所有信息(去重工作)")
    @GetMapping("/all1")    //通过单条数据id查到销售单id
    public Result<List<OrderSaled>> getAllOrderSaled1(){
        List<OrderSaled> list = orderSaledServiceService.list().stream().distinct().collect(Collectors.toList());   //
        return Result.success(list,"查询成功");
    }

    @ApiOperation("新增销售单（单条数据）")
    @PostMapping("/add")
    public Result<?> addOrderSaled(@RequestBody List<OrderSaled> a){   //HTTP请求的请求体解析为一个User的java对象
        a.forEach(orderSaledServiceService::save);
        return Result.success("新增销售单成功");
    }

//    @ApiOperation("新增零售单")
//    @PostMapping("/add")
//    public Result<?> addOrderRetail(@RequestBody OrderRetail customer){   //HTTP请求的请求体解析为一个User的java对象
//        orderRetailServiceService.save(customer);
//        return Result.success("新增客户成功");
//    }


    @ApiOperation("修改销售单（单条数据）信息")
    @PutMapping
    public Result<?> updateOrderSaled(@RequestBody OrderSaled customer){
        orderSaledServiceService.updateById(customer);
        return Result.success("修改销售单单条数据信息成功");
    }


    @ApiOperation("通过id查询销售零售单")
    @GetMapping("/{orderId}")    //通过单条数据id查到销售单id
    public Result<List<OrderSaled>> getOrderSaledById(@PathVariable("orderId") String id){

        List<OrderSaled> list = orderSaledServiceService.list();

        List<OrderSaled> collect = list.stream().filter(orderSaled -> orderSaled.getOrderId().equals(id)).collect(Collectors.toList());

        return Result.success(collect,"查询成功");
//        OrderSaled customer = orderSaledServiceService.getById(id);
//        return Result.success(customer);
//        List<OrderSaled> orderSaledList = new ArrayList<>();
    }


    @ApiOperation("通过id删除销售")       //使用存疑
    @DeleteMapping("/{id}")
    public Result<OrderSaled> deleteOrderSaledById(@PathVariable("id") Integer id){
        orderSaledServiceService.removeById(id);
        return Result.success("删除销售成功");
    }
}
