package com.hit.sys.service.impl;

import com.hit.sys.entity.Goods;
import com.hit.sys.mapper.GoodsMapper;
import com.hit.sys.service.IGoodsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 货品表 服务实现类
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@Service
public class GoodsServiceImpl extends ServiceImpl<GoodsMapper, Goods> implements IGoodsService {

}
