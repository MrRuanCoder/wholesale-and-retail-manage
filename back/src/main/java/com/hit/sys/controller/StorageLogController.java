package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.StorageLog;
import com.hit.sys.entity.Supplier;
import com.hit.sys.entity.User;
import com.hit.sys.service.impl.StorageLogServiceImpl;
import com.hit.sys.service.impl.SupplierServiceImpl;
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
@RestController
@RequestMapping("/sys/storageLog")
@CrossOrigin
public class StorageLogController {
    @Autowired
    private StorageLogServiceImpl storageLogService;

    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<StorageLog>> getAllLog(){
        List<StorageLog> list = storageLogService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("新增日志")
    @PostMapping("/add")
    public Result<?> addLog(@RequestBody StorageLog supplier){   //HTTP请求的请求体解析为一个User的java对象
        storageLogService.save(supplier);
        return Result.success("新增日志成功");
    }

    @ApiOperation("修改入库日志信息")
    @PutMapping
    public Result<?> updateLog(@RequestBody StorageLog supplier){
        storageLogService.updateById(supplier);       //已传入的字段如果为空，该字段是不会更新的
        return Result.success("修改日志成功");
    }

    @ApiOperation("通过id删除日志")
    @DeleteMapping("/{id}")
    public Result<StorageLog> deleteUserById(@PathVariable("id") Integer id){
        storageLogService.removeById(id);
        return Result.success("删除用户成功");
    }
}
