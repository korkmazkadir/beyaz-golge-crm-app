/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kadirkorkmaz.react.component;

import com.kadirkorkmaz.react.entity.Athlete;
import com.kadirkorkmaz.react.entity.AthleteInfo;
import com.kadirkorkmaz.react.entity.Beer;
import com.kadirkorkmaz.react.entity.Camp;
import com.kadirkorkmaz.react.repository.AthleteRepository;
import com.kadirkorkmaz.react.repository.BeerRepository;
import com.kadirkorkmaz.react.repository.CampRepository;
import java.sql.Date;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BeerCommandLineRunner implements CommandLineRunner {

    @Autowired
    private BeerRepository beerRepo;
    
    @Autowired
    private CampRepository campRepo;
    
    @Autowired
    private AthleteRepository athleteRepo;


    @Override
    public void run(String... strings) throws Exception {
        
        System.out.println("Creating beers and camps...");
        
        // Top beers from https://www.beeradvocate.com/lists/top/
        Stream.of("Kentucky Brunch Brand Stout", "Good Morning", "Very Hazy", "King Julius",
                "Budweiser", "Coors Light", "PBR").forEach(name
                        -> beerRepo.save(new Beer(name))
                );
        beerRepo.findAll().forEach(System.out::println);
        
        createCamps();
        createAthlete();
    }
    
    private void createCamps(){
        Camp camp1 = new Camp("Yaz tatili", "Kartepe", new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis()));
        Camp camp2 = new Camp("Kış Okulu", "Ankara", new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis()));
        campRepo.save(camp1);
        campRepo.save(camp2);
    }
    
    private void createAthlete(){
        Athlete athlete1 = new Athlete();
        AthleteInfo i1 = new AthleteInfo();
        i1.setIdNumber("45550666412");
        i1.setName("Kadir");
        i1.setSurname("Korkmaz");
        athlete1.setAthleteInfo(i1);
        
        
        Athlete athlete2 = new Athlete();
        AthleteInfo i2 = new AthleteInfo();
        i2.setIdNumber("63097954328");
        i2.setName("Kemal");
        i2.setSurname("Katmer");
        athlete2.setAthleteInfo(i2);
        
        athleteRepo.save(athlete1);
        athleteRepo.save(athlete2);
    }
    
    
}
