package com.hit.sys.mapper;

import com.hit.sys.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Ruan
 * @since 2023-05-31
 */
public interface UserMapper extends BaseMapper<User> {

    public List<String> getRoleNameByUserId(Integer userId);
}
