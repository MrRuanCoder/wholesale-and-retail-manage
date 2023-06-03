package com.hit.sys.service.impl;

import com.hit.sys.entity.UserRole;
import com.hit.sys.mapper.UserRoleMapper;
import com.hit.sys.service.IUserRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Ruan
 * @since 2023-05-31
 */
@Service
public class UserRoleServiceImpl extends ServiceImpl<UserRoleMapper, UserRole> implements IUserRoleService {
    
@Autowired
private UserRoleMapper userRoleMapper;

    @Override
    public Long getRoleIdByUserid(Long userId) {
        // 调用userRoleMapper的相应方法查询roleid
        return userRoleMapper.getRoleIdByUserid(userId);
    }
}
