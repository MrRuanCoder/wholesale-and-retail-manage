package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.Customer;
import com.hit.sys.entity.Storage;
import com.hit.sys.entity.Supplier;
import com.hit.sys.entity.User;
import com.hit.sys.service.impl.StorageServiceImpl;
import com.hit.sys.service.impl.SupplierServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * <p>
 * 仓库总表 前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@RestController
@RequestMapping("/sys/storage")
@CrossOrigin
public class StorageController {
    @Autowired
    private StorageServiceImpl storageService;

    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<Storage>> getAllStorage(){
        List<Storage> list = storageService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("新增storage")
    @PostMapping("/add")
    public Result<?> addStorage(@RequestBody Storage supplier){   //HTTP请求的请求体解析为一个User的java对象
        storageService.save(supplier);
        return Result.success("新增仓库成功");
    }

    //使用需考虑
    @ApiOperation("修改仓库信息")
    @PutMapping
    public Result<?> updateStorage(@RequestBody Storage supplier){
        storageService.updateById(supplier);       //已传入的字段如果为空，该字段是不会更新的
        return Result.success("修改仓库成功");
    }

    @ApiOperation("通过id查询仓库数据")
    @GetMapping("/{id}")    //通过id查到用户数据
    public Result<Storage> getStorageById(@PathVariable("id") Integer id){
        Storage customer = storageService.getById(id);
        return Result.success(customer);
    }

    //使用需考虑
//    @ApiOperation("通过id删除用户")
//    @DeleteMapping("/{name}")
//    public Result<User> deleteUserById(@PathVariable("name") String name){
//        supplierService.deleteByName(name);
//        return Result.success("删除用户成功");
//    }
}
