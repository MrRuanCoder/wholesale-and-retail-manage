package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.Supplier;
import com.hit.sys.entity.User;
import com.hit.sys.service.impl.SupplierServiceImpl;
import com.hit.sys.service.impl.UserRoleServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@RestController     //必须要改成这个，否则解析器无法找到视图报500
@RequestMapping("/sys/supplier")
@CrossOrigin
public class SupplierController {
    @Autowired
    private SupplierServiceImpl supplierService;

    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<Supplier>> getAllSupplier(){
        List<Supplier> list = supplierService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("新增供应商")
    @PostMapping("/add")
    public Result<?> addSupplier(@RequestBody Supplier supplier){   //HTTP请求的请求体解析为一个User的java对象
        supplierService.save(supplier);
        return Result.success("新增供应商成功");
    }

    @ApiOperation("修改供应商信息")
    @PutMapping
    public Result<?> updateSupplier(@RequestBody Supplier supplier){
        supplierService.updateById(supplier);       //已传入的字段如果为空，该字段是不会更新的
        return Result.success("修改供应商成功");
    }

    @ApiOperation("通过name查询用户数据")
    @GetMapping("/{supplierName}")    //通过id查到供应商数据
    public Result<Supplier> getUserById(@PathVariable("supplierName") String name){
        Supplier supplier = supplierService.getByName(name);
        return Result.success(supplier);
    }

    @ApiOperation("通过name删除用户")
    @DeleteMapping("/{name}")
    public Result<User> deleteSupplierByName(@PathVariable("name") String name){
        supplierService.deleteByName(name);
        return Result.success("删除供应商成功");
    }

}
