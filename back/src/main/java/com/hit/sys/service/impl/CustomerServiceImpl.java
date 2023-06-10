package com.hit.sys.service.impl;

import com.hit.sys.entity.Customer;
import com.hit.sys.mapper.CustomerMapper;
import com.hit.sys.service.ICustomerService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 客户表 服务实现类
 * </p>
 *
 * @author Ruan
 * @since 2023-06-10
 */
@Service
public class CustomerServiceImpl extends ServiceImpl<CustomerMapper, Customer> implements ICustomerService {

}
