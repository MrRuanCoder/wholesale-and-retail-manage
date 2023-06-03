package com.hit.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 
 * </p>
 *
 * @author Ruan
 * @since 2023-06-03
 */
@TableName("t_menu")
@Data
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "menu_id", type = IdType.AUTO)
    private Long menuId;
    private String component;
    private String path;
    private String redirect;
    private String name;
    private String title;
    private Integer parentId;
    private String isLeaf;
    private Boolean hidden;
    private String icon;

    @TableField(exist = false)
    @JsonInclude(JsonInclude.Include.NON_EMPTY) //在序列化过程中，如果一个属性的值为 null 或者为空字符串，那么在生成的 JSON 字符串中将会被忽略。
    private List<Menu> children;    //这个名称与前端对应

    @TableField(exist = false)
    private Map<String,Object> meta;
    public Map<String,Object> getMeta(){
        meta = new HashMap<>();
        meta.put("title",title);    //放属性title（与前端保持一致）
        meta.put("icon",icon);
        return meta;
    }

}
