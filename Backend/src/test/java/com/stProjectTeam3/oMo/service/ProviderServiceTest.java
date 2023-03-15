package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import com.stProjectTeam3.oMo.dto.ProviderDto;
import com.stProjectTeam3.oMo.dto.ProviderListDto;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ProviderServiceTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    public void getMovieProviderTest(){
        int id = 22803;

        ProviderService providerService = ac.getBean(ProviderService.class);
        ProviderListDto movieProvider = providerService.getMovieProvider(id);
        System.out.println("buy:");
        for (ProviderDto providerDto : movieProvider.getBuyList()) {
            System.out.println("name = " + providerDto.getName());
            System.out.println("logo_path = " + providerDto.getLogo_path());
        }
        System.out.println("rent:");
        for (ProviderDto providerDto : movieProvider.getRentList()) {
            System.out.println("name = " + providerDto.getName());
            System.out.println("logo_path = " + providerDto.getLogo_path());
        }
        System.out.println("flat:");
        for (ProviderDto providerDto : movieProvider.getFlatList()) {
            System.out.println("name = " + providerDto.getName());
            System.out.println("logo_path = " + providerDto.getLogo_path());
        }
    }

    @Test
    public void getTvProviderTest(){
        int id = 119769;

        ProviderService providerService = ac.getBean(ProviderService.class);
        ProviderListDto tvProvider = providerService.getTvProvider(id);
        System.out.println("buy:");
        for (ProviderDto providerDto : tvProvider.getBuyList()) {
            System.out.println("name = " + providerDto.getName());
            System.out.println("logo_path = " + providerDto.getLogo_path());
        }
        System.out.println("rent:");
        for (ProviderDto providerDto : tvProvider.getRentList()) {
            System.out.println("name = " + providerDto.getName());
            System.out.println("logo_path = " + providerDto.getLogo_path());
        }
        System.out.println("flat:");
        for (ProviderDto providerDto : tvProvider.getFlatList()) {
            System.out.println("name = " + providerDto.getName());
            System.out.println("logo_path = " + providerDto.getLogo_path());
        }
    }
}
