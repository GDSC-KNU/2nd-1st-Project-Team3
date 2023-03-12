package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.AppConfig;
import com.stProjectTeam3.oMo.dto.CastDto;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class CreditServiceTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    void movieCastTest(){
        int id = 22803;

        CreditService creditService = ac.getBean(CreditService.class);
        List<CastDto> movieCast = creditService.getMovieCast(id);

        for (CastDto castDto : movieCast) {
            System.out.println("castDto = " + castDto);
        }
    }

    @Test
    void tvCastTest(){
        int id = 119769;
        String language = "ko-KO";

        CreditService creditService = ac.getBean(CreditService.class);
        List<CastDto> tvCast = creditService.getTvCast(id, language);

        for (CastDto castDto : tvCast) {
            System.out.println("castDto = " + castDto);
        }
    }
}
