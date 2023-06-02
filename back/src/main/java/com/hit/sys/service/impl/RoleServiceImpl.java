package com.hit.sys.service.impl;

import com.hit.sys.entity.Role;
import com.hit.sys.entity.RoleMenu;
import com.hit.sys.mapper.RoleMapper;
import com.hit.sys.mapper.RoleMenuMapper;
import com.hit.sys.service.IRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * <p>
 * role说明表 服务实现类
 * </p>
 *
 * @author Ruan
 * @since 2023-05-31
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {
    @Resource
    private RoleMenuMapper roleMenuMapper;


}
