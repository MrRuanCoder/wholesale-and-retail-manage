package com.hit.config;

import com.hit.interceptor.JwtValidateInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * description: add a description [描述信息]
 *
 * @author Ruan [作者]
 * @version 1.0.0 [版本信息]
 * @date 2023/06/02 18:38:11 [时间，这里是年/月/日 时:分:秒的格式]
 */
@Configuration      //注释掉相当于让拦截器失效
public class MyInterceptorConfig implements WebMvcConfigurer {
    @Autowired
    private JwtValidateInterceptor jwtValidateInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration registration = registry.addInterceptor(jwtValidateInterceptor);
        registration.addPathPatterns("/**") //拦截所有
                .excludePathPatterns(       //拦截放行
                        "/sys/user/login",       //...第一个要加/
                        "/sys/user/info",
                        "/sys/user/logout",
                        "/sys/role/all",
//                        "/sys/user/all",
                        //放行了swagger，不会被拦截
                        "/error",
                        "/swagger-ui/**",
                        "/swagger-resources/**",
                        "/v3/**"

                );
//                .order(Ordered.HIGHEST_PRECEDENCE); // 设置拦截器的执行顺序为最高优先级
    }
}
