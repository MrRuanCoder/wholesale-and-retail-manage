package com.hit.sys.controller;

import com.hit.controller.commom.vo.Result;
import com.hit.sys.entity.*;
import com.hit.sys.service.impl.*;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

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
@CrossOrigin
public class StorageGoodsController {
    @Autowired
    private StorageGoodsServiceImpl storageGoodsService;

    @Autowired
    private StorageLogServiceImpl storageLogService;

    @Autowired
    private GoodsServiceImpl goodsService;
    @Autowired
    private StorageServiceImpl storageService;


    @ApiOperation("查询所有信息")
    @GetMapping("/all")
    public Result<List<StorageGoods>> getAllSG(){
        List<StorageGoods> list = storageGoodsService.list();
        return Result.success(list,"查询成功");
    }

    @ApiOperation("查询所有信息")
    @GetMapping("/all1")
    public Result<List<Map<String, Object>>> getAllSG1(){
        List<Goods> listG = goodsService.list();
        List<Storage> listS = storageService.list();
        List<StorageGoods> listSG = storageGoodsService.list();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Goods goods : listG) {
            Map<String, Object> map = new HashMap<>();
            map.put("goodsName", goods.getName());
            map.put("purchasePrice", goods.getPurchasePrice());

            List<Map<String, Object>> numbers = new ArrayList<>();
            for (Storage storage : listS) {
                Map<String, Object> map1 = new HashMap<>();
                map1.put("storageName", storage.getStorageName());
//                map1.put("number", storage.getStorageNumber());
                Optional<StorageGoods> first = listSG.stream().filter(sg -> sg.getGoodsName()
                                .equals(goods.getName()) && sg.getStorageName()
                                .equals(storage.getStorageName()))
                        .findFirst();
                if (first.isPresent()) {
                    map1.put("number", first.get().getNumber());
                } else {
                    map1.put("number", 0);
                }

                numbers.add(map1);
            }
            map.put("numbers", numbers);
            result.add(map);
}
        return Result.success(result,"查询成功");
    }

    @ApiOperation("在库存仓库中新增货品（待商定）")
    @PostMapping("/add")
    public Result<?> addSG(@RequestBody StorageGoods supplier){   //HTTP请求的请求体解析为一个User的java对象
        storageGoodsService.save(supplier);
        return Result.success("新增货物成功");
    }

    @ApiOperation("修改仓库商品信息")
    @PutMapping
    public Result<?> updateSG(@RequestBody Map<String, Object> supplier){
//        storageGoodsService.updateById(supplier);
//        return Result.success("修改仓库商品成功");

        StorageGoods storageGoods = new StorageGoods();

        Long id = ((Integer)supplier.get("recordId")).longValue();
        storageGoods.setRecordId(id);
        Long number = ((Integer) supplier.get("number")).longValue();
        storageGoods.setNumber(number);

        String time = (String) supplier.get("time");
        String description = (String) supplier.get("description");
        String storageName = (String) supplier.get("storageName");
        String goodsName = (String) supplier.get("goodsName");

        storageGoods.setRecordId(id);
        storageGoods.setNumber(number);

        storageGoodsService.updateById(storageGoods);

        StorageLog log = new StorageLog();
        log.setTime(time);
        log.setDescription(description);
        log.setGoodsName(goodsName);
        log.setStorageName(storageName);

        storageLogService.save(log);


//        storageGoodsService.updateById(supplier);
        return Result.success("修改仓库商品成功");

    }

//    @ApiOperation("通过id删除用户")
//    @DeleteMapping("/{name}")
//    public Result<User> deleteUserById(@PathVariable("name") String name){
//        supplierService.deleteByName(name);
//        return Result.success("删除用户成功");
//    }

}
