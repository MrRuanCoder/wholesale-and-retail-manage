package com.hit.interceptor;

import com.alibaba.fastjson2.JSON;
import com.hit.common.utils.JwtUtil;
import com.hit.controller.commom.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * description: add a description [描述信息]
 *
 * @author Ruan [作者]
 * @version 1.0.0 [版本信息]
 * @date 2023/06/02 18:31:56 [时间，这里是年/月/日 时:分:秒的格式]
 */
@Component
@Slf4j
public class JwtValidateInterceptor implements HandlerInterceptor  {    //token验证成功放行，失败则拦截
    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token  = request.getHeader("Authorization");   //前端token规定可改
        log.debug(request.getRequestURI() + "需要验证： " + token); //日志来打印输出信息
//        if(token != null){
        if (token != null && token.startsWith("Bearer ")) {
            // 移除 Bearer 头部
            token = token.substring(7);

            try {
                jwtUtil.parseToken(token);
                log.debug(request.getRequestURI() + "验证通过");
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        log.debug(request.getRequestURI() + "验证失败，禁止访问");

        response.setContentType("application/json;charset=utf-8");
        Result<Object> fail = Result.fail(20003, "jwt无效，请重新登录");//提示前端（fail静态方法
        response.getWriter().write(JSON.toJSONString(fail));

        return false; // 拦截
    }
}
