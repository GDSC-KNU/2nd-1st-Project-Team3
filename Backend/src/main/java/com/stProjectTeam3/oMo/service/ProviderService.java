package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.dto.ProviderDto;
import com.stProjectTeam3.oMo.dto.ProviderListDto;
import info.movito.themoviedbapi.TmdbApi;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProviderService {

    @Value("${tmdb.key}")
    String apiKey;

    String image_BasePath = "https://image.tmdb.org/t/p/";
    String[] logo_sizes = {"w45","w92","w154","w185","w300","w500","original"};


    public ProviderListDto getMovieProvider(int id){

        List<ProviderDto> buyList = new ArrayList<>();
        List<ProviderDto> rentList = new ArrayList<>();
        List<ProviderDto> flatList = new ArrayList<>();


        try{
            URL url = new URL("https://api.themoviedb.org/3/movie/" + Integer.toString(id) + "/watch/providers?api_key=" + apiKey);

            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));

            String result = br.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
            JSONObject totalResults = (JSONObject) jsonObject.get("results");
            JSONObject krResults = (JSONObject) totalResults.get("KR");
            JSONArray buyResults = (JSONArray) krResults.get("buy");
            JSONArray rentResults = (JSONArray) krResults.get("rent");
            JSONArray flatResults = (JSONArray) krResults.get("flatrate");

            if(buyResults != null && buyResults.size() > 0){
                for(int i = 0; i < buyResults.size(); i++){
                    JSONObject data = (JSONObject) buyResults.get(i);

                    ProviderDto pd = ProviderDto.builder()
                            .logo_path(image_BasePath + logo_sizes[5] + (String)data.get("logo_path"))
                            .name((String) data.get("provider_name"))
                            .build();

                    buyList.add(pd);
                }
            }

            if(rentResults != null && rentResults.size() > 0){
                for(int i = 0; i < rentResults.size(); i++){
                    JSONObject data = (JSONObject) rentResults.get(i);

                    ProviderDto pd = ProviderDto.builder()
                            .logo_path(image_BasePath + logo_sizes[5] +  (String) data.get("logo_path"))
                            .name((String) data.get("provider_name"))
                            .build();

                    rentList.add(pd);
                }
            }

            if(flatResults != null && flatResults.size() > 0){
                for(int i = 0; i < flatResults.size(); i++){
                    JSONObject data = (JSONObject) flatResults.get(i);

                    ProviderDto pd = ProviderDto.builder()
                            .logo_path(image_BasePath + logo_sizes[5] + (String) data.get("logo_path"))
                            .name((String) data.get("provider_name"))
                            .build();

                    flatList.add(pd);
                }
            }


        }catch (Exception e){
            e.printStackTrace();
        }
        finally {
            ProviderListDto pl = ProviderListDto.builder()
                    .buyList(buyList)
                    .rentList(rentList)
                    .flatList(flatList)
                    .build();

            return pl;
        }
    }

    public ProviderListDto getTvProvider(int id){

        List<ProviderDto> buyList = new ArrayList<>();
        List<ProviderDto> rentList = new ArrayList<>();
        List<ProviderDto> flatList = new ArrayList<>();


        try{
            URL url = new URL("https://api.themoviedb.org/3/tv/" + Integer.toString(id) + "/watch/providers?api_key=" + apiKey);

            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));

            String result = br.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
            JSONObject totalResults = (JSONObject) jsonObject.get("results");
            JSONObject krResults = (JSONObject) totalResults.get("KR");
            JSONArray buyResults = (JSONArray) krResults.get("buy");
            JSONArray rentResults = (JSONArray) krResults.get("rent");
            JSONArray flatResults = (JSONArray) krResults.get("flatrate");

            if(buyResults != null && buyResults.size() > 0){
                for(int i = 0; i < buyResults.size(); i++){
                    JSONObject data = (JSONObject) buyResults.get(i);

                    ProviderDto pd = ProviderDto.builder()
                            .logo_path(image_BasePath + logo_sizes[5] + (String)data.get("logo_path"))
                            .name((String) data.get("provider_name"))
                            .build();

                    buyList.add(pd);
                }
            }

            if(rentResults != null && rentResults.size() > 0){
                for(int i = 0; i < rentResults.size(); i++){
                    JSONObject data = (JSONObject) rentResults.get(i);

                    ProviderDto pd = ProviderDto.builder()
                            .logo_path(image_BasePath + logo_sizes[5] +  (String) data.get("logo_path"))
                            .name((String) data.get("provider_name"))
                            .build();

                    rentList.add(pd);
                }
            }

            if(flatResults != null && flatResults.size() > 0){
                for(int i = 0; i < flatResults.size(); i++){
                    JSONObject data = (JSONObject) flatResults.get(i);

                    ProviderDto pd = ProviderDto.builder()
                            .logo_path(image_BasePath + logo_sizes[5] + (String) data.get("logo_path"))
                            .name((String) data.get("provider_name"))
                            .build();

                    flatList.add(pd);
                }
            }


        }catch (Exception e){
            e.printStackTrace();
        }
        finally {
            ProviderListDto pl = ProviderListDto.builder()
                    .buyList(buyList)
                    .rentList(rentList)
                    .flatList(flatList)
                    .build();

            return pl;
        }
    }


}
