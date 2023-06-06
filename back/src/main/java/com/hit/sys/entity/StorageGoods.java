package com.hit.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

/**
 * <p>
 * 仓库子表
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@TableName("t_storage_goods")
public class StorageGoods implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 记录ID
     */
    @TableId(value = "record_id", type = IdType.AUTO)
    private Long recordId;

    /**
     * 仓库ID
     */
    private Long storageId;

    /**
     * 仓库名
     */
    private String storageName;

    /**
     * 货品ID
     */
    private Long goodsId;

    /**
     * 货品名
     */
    private String goodsName;

    /**
     * 库存数量
     */
    private Long number;

    /**
     * 积压资金额
     */
    private Double value;

    public Long getRecordId() {
        return recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }
    public Long getStorageId() {
        return storageId;
    }

    public void setStorageId(Long storageId) {
        this.storageId = storageId;
    }
    public String getStorageName() {
        return storageName;
    }

    public void setStorageName(String storageName) {
        this.storageName = storageName;
    }
    public Long getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Long goodsId) {
        this.goodsId = goodsId;
    }
    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }
    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }
    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "StorageGoods{" +
            "recordId=" + recordId +
            ", storageId=" + storageId +
            ", storageName=" + storageName +
            ", goodsId=" + goodsId +
            ", goodsName=" + goodsName +
            ", number=" + number +
            ", value=" + value +
        "}";
    }
}
