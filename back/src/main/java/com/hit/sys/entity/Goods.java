package com.hit.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

/**
 * <p>
 * 货品表
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@TableName("t_goods")
public class Goods implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 货品ID
     */
    @TableId(value = "GOODS_ID", type = IdType.AUTO)
    private Long goodsId;

    /**
     * 货品名
     */
    private String name;

    /**
     * 进货价格
     */
    private Long purchasePrice;

    /**
     * 批发价格
     */
    private Long wholesalePrice;

    /**
     * 零售价格
     */
    private Long retailPrice;

    public Long getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Long goodsId) {
        this.goodsId = goodsId;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public Long getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Long purchasePrice) {
        this.purchasePrice = purchasePrice;
    }
    public Long getWholesalePrice() {
        return wholesalePrice;
    }

    public void setWholesalePrice(Long wholesalePrice) {
        this.wholesalePrice = wholesalePrice;
    }
    public Long getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(Long retailPrice) {
        this.retailPrice = retailPrice;
    }

    @Override
    public String toString() {
        return "Goods{" +
            "goodsId=" + goodsId +
            ", name=" + name +
            ", purchasePrice=" + purchasePrice +
            ", wholesalePrice=" + wholesalePrice +
            ", retailPrice=" + retailPrice +
        "}";
    }
}
