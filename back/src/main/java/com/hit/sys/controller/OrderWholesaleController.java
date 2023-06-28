package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.OrderRetail;
import com.hit.sys.entity.OrderWholesale;
import com.hit.sys.service.impl.OrderRetailServiceImpl;
import com.hit.sys.service.impl.OrderWholesaleServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * <p>
 * 批发订单表 前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-06-27
 */
@RestController
@RequestMapping("/sys/orderWholesale")
@CrossOrigin
public class OrderWholesaleController {

    @Autowired
    private OrderWholesaleServiceImpl orderWholesaleServiceService;

    @ApiOperation("查询零售单所有信息")
    @GetMapping("/all")
    public Result<List<OrderWholesale>> getAllOrderWholesale(){
        List<OrderWholesale> list = orderWholesaleServiceService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("新增零售单")
    @PostMapping("/add")
    public Result<?> addOrderWholesale(@RequestBody List<OrderWholesale> a){   //HTTP请求的请求体解析为一个User的java对象
        a.forEach(orderWholesaleServiceService::save);
        return Result.success("新增销售单成功");
    }

    @ApiOperation("修改零售单信息")
    @PutMapping
    public Result<?> updateOrderWholesale(@RequestBody OrderWholesale customer){
        orderWholesaleServiceService.updateById(customer);
        return Result.success("修改客户成功");
    }


    @ApiOperation("通过id查询零售单")
    @GetMapping("/{id}")    //通过id查到用户数据
    public Result<OrderWholesale> getOrderWholesaleById(@PathVariable("id") Integer id){
        OrderWholesale customer = orderWholesaleServiceService.getById(id);
        return Result.success(customer);
    }

    @ApiOperation("通过id删除客户")
    @DeleteMapping("/{id}")
    public Result<OrderWholesale> deleteOrderWholesaleById(@PathVariable("id") Integer id){
        orderWholesaleServiceService.removeById(id);
        return Result.success("删除客户成功");
    }
}
