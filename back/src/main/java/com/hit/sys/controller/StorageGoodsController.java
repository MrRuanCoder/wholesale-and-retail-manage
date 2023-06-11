package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.StorageGoods;
import com.hit.sys.entity.Supplier;
import com.hit.sys.entity.User;
import com.hit.sys.service.impl.StorageGoodsServiceImpl;
import com.hit.sys.service.impl.StorageServiceImpl;
import com.hit.sys.service.impl.SupplierServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * <p>
 * 仓库子表 前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@RestController
@RequestMapping("/sys/storageGoods")
public class StorageGoodsController {
    @Autowired
    private StorageGoodsServiceImpl storageGoodsService;

    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<StorageGoods>> getAllSG(){
        List<StorageGoods> list = storageGoodsService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("在库存仓库中新增货品（待商定）")
    @PostMapping("/add")
    public Result<?> addSG(@RequestBody StorageGoods supplier){   //HTTP请求的请求体解析为一个User的java对象
        storageGoodsService.save(supplier);
        return Result.success("新增货物成功");
    }

    @ApiOperation("修改供应商信息")
    @PutMapping
    public Result<?> updateSG(@RequestBody StorageGoods supplier){
        storageGoodsService.updateById(supplier);
        return Result.success("修改供货物成功");
    }

//    @ApiOperation("通过id删除用户")
//    @DeleteMapping("/{name}")
//    public Result<User> deleteUserById(@PathVariable("name") String name){
//        supplierService.deleteByName(name);
//        return Result.success("删除用户成功");
//    }

}
