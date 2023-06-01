package com.hit.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

/**
 * <p>
 * role说明表
 * </p>
 *
 * @author Ruan
 * @since 2023-05-31
 */
@TableName("t_role")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 角色id
     */
    @TableId(value = "role_id", type = IdType.AUTO) //
    private Long roleId;

    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 角色描述
     */
    private String remark;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "Role{" +
            "roleId=" + roleId +
            ", roleName=" + roleName +
            ", remark=" + remark +
        "}";
    }
}
