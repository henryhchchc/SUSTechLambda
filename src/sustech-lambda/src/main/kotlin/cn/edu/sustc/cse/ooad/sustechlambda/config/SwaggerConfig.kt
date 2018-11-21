package cn.edu.sustc.cse.ooad.sustechlambda.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.service.ApiInfo
import springfox.documentation.service.ApiKey
import springfox.documentation.service.Contact
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2

@Configuration
@EnableSwagger2
class SwaggerConfig {

    @Bean
    fun api() = Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("cn.edu.sustc.cse.ooad.sustechlambda.controllers"))
            .paths(PathSelectors.ant("/api/**"))
            .build()
            .apiInfo(ApiInfo(
                    "SUSTech Lambda API",
                    "REST APIs for SUSTech",
                    "v1",
                    "",
                    Contact("SUSTech Lambda Team", "", ""),
                    "MIT License",
                    "https://opensource.org/licenses/MIT",
                    emptyList()
            ))
            .produces(setOf("application/json"))
            .securitySchemes(mutableListOf(
                    ApiKey("Bearer", "Authorization", "header")
            ))
}
