package com.hit.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

/**
 * <p>
 * 仓库总表
 * </p>
 *
 * @author Ruan
 * @since 2023-06-06
 */
@TableName("t_storage")
public class Storage implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 仓库ID
     */
    @TableId(value = "storage_id", type = IdType.AUTO)
    private Long storageId;

    /**
     * 仓库名
     */
    private String storageName;

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

    @Override
    public String toString() {
        return "Storage{" +
            "storageId=" + storageId +
            ", storageName=" + storageName +
        "}";
    }
}
