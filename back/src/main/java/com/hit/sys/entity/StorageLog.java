package com.hit.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@TableName("t_storage_log")
public class StorageLog implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 日志id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String goodsName;

    /**
     * 操作时间
     */
    private String time;

    /**
     * 操作仓库
     */
    private String storageName;

    /**
     * 操作描述
     */
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
    public String getStorageName() {
        return storageName;
    }

    public void setStorageName(String storageName) {
        this.storageName = storageName;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "StorageLog{" +
            "id=" + id +
            ", goodsName=" + goodsName +
            ", time=" + time +
            ", storageName=" + storageName +
            ", description=" + description +
        "}";
    }
}
