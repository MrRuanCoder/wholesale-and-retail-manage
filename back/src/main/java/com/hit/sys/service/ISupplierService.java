package com.hit.sys.service;

import com.hit.sys.entity.Supplier;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
public interface ISupplierService extends IService<Supplier> {
    public void deleteByName(String name);
}
