package com.hit.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

/**
 * description: add a description [描述信息]
 *
 * @author Ruan [作者]
 * @version 1.0.0 [版本信息]
 * @date 2023/05/31 10:11:26 [时间，这里是年/月/日 时:分:秒的格式]
 */
public class MyRedisConfig {

    @Resource
    private RedisConnectionFactory factory;

    @Bean
    public RedisTemplate redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(factory);

        //下面好像主要处理键值对
        redisTemplate.setKeySerializer(new StringRedisSerializer());

        Jackson2JsonRedisSerializer serializer = new Jackson2JsonRedisSerializer<Object>(Object.class);
        redisTemplate.setValueSerializer(serializer);

        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        om.setTimeZone(TimeZone.getDefault());
        om.configure(MapperFeature.USE_ANNOTATIONS, false);
        om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        om.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance ,ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        om.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        serializer.setObjectMapper(om);

        return  redisTemplate;
    }
//    @Resource
//    private RedisConnectionFactory factory;
//    //RedisTemplate 中配置自定义的反序列化器以将十六进制字符串转换为字符串类型
//    @Bean
//    public RedisTemplate<String, String> redisTemplate() {
//        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
//        redisTemplate.setConnectionFactory(factory);
//
//        // 设置键的序列化器
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//
//        // 设置值的序列化器
//        redisTemplate.setValueSerializer(new HexStringToStringSerializer());
//
//        redisTemplate.afterPropertiesSet();
//        return redisTemplate;
//    }
//
//    public class HexStringToStringSerializer implements RedisSerializer<String> {
//
//        @Override
//        public byte[] serialize(String s) throws SerializationException {
//            // 不需要实现该方法，因为我们只关注反序列化
//            return null;
//        }
//
//        @Override
//        public String deserialize(byte[] bytes) throws SerializationException {
//            if (bytes == null) {
//                return null;
//            }
//            return new String(bytes, StandardCharsets.UTF_8);
//        }
//    }

}
