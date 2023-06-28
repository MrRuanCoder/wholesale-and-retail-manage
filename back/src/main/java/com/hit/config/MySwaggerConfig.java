package com.hit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Collections;
import java.util.List;

/**
 * description: add a description [描述信息]
 *
 * @author Ruan [作者]
 * @version 1.0.0 [版本信息]
 * @date 2023/06/02 18:50:54 [时间，这里是年/月/日 时:分:秒的格式]
 */
@Configuration
@EnableOpenApi
@EnableWebMvc
public class MySwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.hit"))
                .paths(PathSelectors.any())
                .build()
                .securitySchemes(Collections.singletonList(securityScheme()))
                .securityContexts(Collections.singletonList(securityContext()));
    }

    private SecurityScheme securityScheme() {
        //第一个参数 "Authorization" 是该安全方案的名称，可以根据实际需要进行命名。
        //第二个参数 "Authorization" 是在请求头中用于携带 Token 的字段名称。根据你的代码中的逻辑，这里使用的是 "Authorization" 字段。
        //第三个参数 "header" 指定了 Token 是通过请求头的方式进行传递。也可以使用其他方式，如 "query" 表示通过查询参数传递 Token。
        return new ApiKey("Authorization", "Authorization", "header");
//        return new ApiKey("Authorization", "Bearer {token}", "header");

//        return new ApiKey("X-Token", "X-Token", "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.regex("^(?!auth).*$"))
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Collections.singletonList(
                new SecurityReference("Authorization", authorizationScopes));
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("通用批发零售业务管理系统接口文档")
                .description("通用批发零售业务管理系统后端代码--By 阮浩麒")
                .version("1.0")
                .contact(new Contact("spear", "https://www.google.com/", "spearKanojo@outlook.com"))
                .build();
    }
}
