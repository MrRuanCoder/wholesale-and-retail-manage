package com.hit;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.Collections;

/**
 * description: add a description [描述信息]
 *
 * @author Ruan [作者]
 * @version 1.0.0 [版本信息]
 * @date 2023/05/31 01:24:34 [时间，这里是年/月/日 时:分:秒的格式]
 */
public class CodeGenerator {
    public static void main(String[] args) {
        String url = "jdbc:mysql:///hitlab";
        String username = "root";
        String password = "";
        String moduleName = "sys";
        String mapperLocation = "D:\\CS\\projects\\SPPM_lab\\SPPM_lab\\wholesale-and-retail-manage\\back\\src\\main\\resources\\mapper\\" + moduleName;
        String tables = "t_user,t_role,t_user_role,t_role_menu";
        FastAutoGenerator.create(url, username, password)
                .globalConfig(builder -> {
                    builder.author("Ruan") // 设置作者
                            //.enableSwagger() // 开启 swagger 模式
                            //.fileOverride() // 覆盖已生成文件
                            .outputDir("D:\\CS\\projects\\SPPM_lab\\SPPM_lab\\wholesale-and-retail-manage\\back\\src\\main\\java"); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("com.hit") // 设置父包名
                            .moduleName(moduleName) // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.xml, mapperLocation)); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude(tables) // 设置需要生成的表名
                            .addTablePrefix("t_"); // 设置过滤表前缀
                })
                .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .execute();
    }
}
