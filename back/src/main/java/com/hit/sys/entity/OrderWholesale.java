package com.hit.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 批发订单表
 * </p>
 *
 * @author Ruan
 * @since 2023-06-27
 */
@TableName("t_order_wholesale")
public class OrderWholesale implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 订单编号
     */
    @TableId(value = "orders_id", type = IdType.AUTO)
    private Integer ordersId;

    /**
     * 客户姓名
     */
    private String customerName;

    /**
     * 客户手机号码
     */
    private String customerPhone;

    /**
     * 货品ID
     */
    private Long goodsId;

    /**
     * 货品数量
     */
    private Long goodsNum;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 已收款金额
     */
    private Double pricePaid;

    /**
     * 销售单价格
     */
    private Double ordersPrice;

    /**
     * 订单状态
     */
    private String status;

    /**
     * 收货地址
     */
    private String ordersAddress;

    /**
     * 发货仓库
     */
    private String storehouse;

    /**
     * 订单分期数
     */
    private Double ordersPeriod;

    /**
     * 订单利润
     */
    private Double ordersProfile;

    /**
     * 商品名称
     */
    private String goodsName;

    public Integer getOrdersId() {
        return ordersId;
    }

    public void setOrdersId(Integer ordersId) {
        this.ordersId = ordersId;
    }
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
    public Long getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Long goodsId) {
        this.goodsId = goodsId;
    }
    public Long getGoodsNum() {
        return goodsNum;
    }

    public void setGoodsNum(Long goodsNum) {
        this.goodsNum = goodsNum;
    }
    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
    public Double getPricePaid() {
        return pricePaid;
    }

    public void setPricePaid(Double pricePaid) {
        this.pricePaid = pricePaid;
    }
    public Double getOrdersPrice() {
        return ordersPrice;
    }

    public void setOrdersPrice(Double ordersPrice) {
        this.ordersPrice = ordersPrice;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public String getOrdersAddress() {
        return ordersAddress;
    }

    public void setOrdersAddress(String ordersAddress) {
        this.ordersAddress = ordersAddress;
    }
    public String getStorehouse() {
        return storehouse;
    }

    public void setStorehouse(String storehouse) {
        this.storehouse = storehouse;
    }
    public Double getOrdersPeriod() {
        return ordersPeriod;
    }

    public void setOrdersPeriod(Double ordersPeriod) {
        this.ordersPeriod = ordersPeriod;
    }
    public Double getOrdersProfile() {
        return ordersProfile;
    }

    public void setOrdersProfile(Double ordersProfile) {
        this.ordersProfile = ordersProfile;
    }
    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    @Override
    public String toString() {
        return "OrderWholesale{" +
            "ordersId=" + ordersId +
            ", customerName=" + customerName +
            ", customerPhone=" + customerPhone +
            ", goodsId=" + goodsId +
            ", goodsNum=" + goodsNum +
            ", createTime=" + createTime +
            ", pricePaid=" + pricePaid +
            ", ordersPrice=" + ordersPrice +
            ", status=" + status +
            ", ordersAddress=" + ordersAddress +
            ", storehouse=" + storehouse +
            ", ordersPeriod=" + ordersPeriod +
            ", ordersProfile=" + ordersProfile +
            ", goodsName=" + goodsName +
        "}";
    }
}
