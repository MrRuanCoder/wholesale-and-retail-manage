package com.hit.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

/**
 * <p>
 * 客户表
 * </p>
 *
 * @author Ruan
 * @since 2023-06-08
 */
@TableName("t_customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 客户ID
     */
    @TableId(value = "CUSTOMER_ID", type = IdType.AUTO)
    private Long customerId;

    /**
     * 姓名
     */
    private String name;

    /**
     * 性别
     */
    private String gender;

    /**
     * 电话
     */
    private String phone;

    /**
     * 客户类型
     */
    private String type;

    /**
     * 会员标记
     */
    private String vip;

    /**
     * 积分
     */
    private Long points;

    private Long balance;
    private String address;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public String getVip() {
        return vip;
    }

    public void setVip(String vip) {
        this.vip = vip;
    }
    public Long getPoints() {
        return points;
    }

    public void setPoints(Long points) {
        this.points = points;
    }
    public Long getBalance() {
        return balance;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Customer{" +
            "customerId=" + customerId +
            ", name=" + name +
            ", gender=" + gender +
            ", phone=" + phone +
            ", type=" + type +
            ", vip=" + vip +
            ", points=" + points +
            ", balance=" + balance +
                ", address=" + address +
        "}";
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
