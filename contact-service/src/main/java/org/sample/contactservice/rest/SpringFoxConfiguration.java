package org.sample.contactservice.rest;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SpringFoxConfiguration {

		

    @Bean
    public Docket api() {   
    	
 
    	
        return new Docket(DocumentationType.OAS_30)
          .apiInfo(apiInfo())
          .useDefaultResponseMessages(false)
          .select()                                  
          .apis(RequestHandlerSelectors.basePackage("org.sample.contactservice"))              
          .paths(PathSelectors.any())
          .build();                                           
    }
    
    

    
    private ApiInfo apiInfo() {
    	return new ApiInfo("Contact Service API", 
    								"API that allows to perform CRUD operations for contact information stored in a DB.",
    								"1.0", 
    								"", 
    								new Contact("Andreas Krause", "", ""),
    								"Demo", 
    								"", Collections.emptyList());
    }
    

}
