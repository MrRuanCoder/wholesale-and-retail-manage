package com.hit.controller.commom.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * description: add a description [描述信息]
 *
 * @author Ruan [作者]
 * @version 1.0.0 [版本信息]
 * @date 2023/05/31 09:13:15 [时间，这里是年/月/日 时:分:秒的格式]
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {

    private Integer code;
    private String message;
    private T data;

    public static <T> Result<T> success(){
        return new Result<>(20000,"success",null);
    }

    public static <T> Result<T> success(T data){
        return new Result<>(20000,"success",data);
    }

    public static <T> Result<T> success(T data,String message){
        return new Result<>(20000,message,data);
    }

    public static <T> Result<T> success(String message){
        return new Result<>(20000,message,null);
    }

    public static<T>  Result<T> fail(){
        return new Result<>(20001,"fail",null);
    }

    public static<T>  Result<T> fail(Integer code){
        return new Result<>(code,"fail",null);
    }

    public static<T>  Result<T> fail(Integer code, String message){
        return new Result<>(code,message,null);
    }

    public static<T>  Result<T> fail( String message){
        return new Result<>(20001,message,null);
    }

}
