package com.hit.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.hit.sys.entity.Supplier;
import com.hit.sys.mapper.SupplierMapper;
import com.hit.sys.service.ISupplierService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@Service
public class SupplierServiceImpl extends ServiceImpl<SupplierMapper, Supplier> implements ISupplierService {
    public void deleteByName(String name) {
        Map<String, Object> columnMap = new HashMap<>();
        columnMap.put("supplier_name", name);
        remove(new QueryWrapper<Supplier>().allEq(columnMap));
    }

}
