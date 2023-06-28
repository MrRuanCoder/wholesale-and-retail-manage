package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.Goods;
import com.hit.sys.entity.StorageGoods;
import com.hit.sys.service.impl.GoodsServiceImpl;
import com.hit.sys.service.impl.StorageGoodsServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * <p>
 * 货品表 前端控制器
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@RestController
@RequestMapping("/sys/goods")
@CrossOrigin
public class GoodsController {
    @Autowired
    private GoodsServiceImpl goodsService;

    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<Goods>> getAllGoods(){
        List<Goods> list = goodsService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("在库存仓库中新增货品（待商定）")
    @PostMapping("/add")
    public Result<?> addGoods(@RequestBody Goods supplier){   //HTTP请求的请求体解析为一个User的java对象
        goodsService.save(supplier);
        return Result.success("新增商品成功");
    }

    @ApiOperation("修改商品信息")
    @PutMapping
    public Result<?> updateGoods(@RequestBody Goods supplier){
        goodsService.updateById(supplier);
        return Result.success("修改商品成功");
//        boolean updated = goodsService.updateById(supplier);
//        if (updated) {
//            return Result.success("修改商品成功");
//        } else {
//            return Result.fail("修改商品失败");
//        }
    }


//    @ApiOperation("通过id删除用户")
//    @DeleteMapping("/{name}")
//    public Result<User> deleteUserById(@PathVariable("name") String name){
//        supplierService.deleteByName(name);
//        return Result.success("删除用户成功");
//    }

}
