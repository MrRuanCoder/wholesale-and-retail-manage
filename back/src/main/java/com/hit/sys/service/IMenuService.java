package com.hit.sys.service;

import com.hit.sys.entity.Menu;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Ruan
 * @since 2023-06-03
 */
public interface IMenuService extends IService<Menu> {

    List<Menu> getAllMenu();
}
