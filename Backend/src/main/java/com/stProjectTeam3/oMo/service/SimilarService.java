package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.dto.ProviderDto;
import com.stProjectTeam3.oMo.dto.ProviderListDto;
import com.stProjectTeam3.oMo.dto.SearchResultDto;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbMovies;
import info.movito.themoviedbapi.TmdbTV;
import info.movito.themoviedbapi.model.MovieDb;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
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
public class SimilarService {

    @Value("${tmdb.key}")
    String apiKey;

    String image_BasePath = "https://image.tmdb.org/t/p/";
    String[] post_size = {"w92","w154","w185","w342","w500","w780","original"};

    public List<SearchResultDto> getMovieRecommend(int id, String language, int page){
        TmdbMovies tmdbMovies = new TmdbApi(apiKey).getMovies();
        MovieResultsPage movieResultsPage = tmdbMovies.getRecommendedMovies(id, language, page);
        List<MovieDb> results = movieResultsPage.getResults();

        List<SearchResultDto> resultList = new ArrayList<>();

        for (MovieDb movieDb : results) {
            SearchResultDto searchResultDto = SearchResultDto.builder()
                    .id(movieDb.getId())
                    .original_title(movieDb.getOriginalTitle())
                    .title(movieDb.getTitle())
                    .date(movieDb.getReleaseDate())
                    .media_type("MOVIE")
                    .poster_path(image_BasePath + post_size[4] + movieDb.getPosterPath())
                    .build();

            resultList.add(searchResultDto);
        }

        return resultList;
    }

    public List<SearchResultDto> getMovieSimilar(int id, String language, int page){
        TmdbMovies tmdbMovies = new TmdbApi(apiKey).getMovies();
        MovieResultsPage movieResultsPage = tmdbMovies.getSimilarMovies(id, language, page);
        List<MovieDb> results = movieResultsPage.getResults();

        List<SearchResultDto> resultList = new ArrayList<>();

        for (MovieDb movieDb : results) {
            SearchResultDto searchResultDto = SearchResultDto.builder()
                    .id(movieDb.getId())
                    .original_title(movieDb.getOriginalTitle())
                    .title(movieDb.getTitle())
                    .date(movieDb.getReleaseDate())
                    .media_type("MOVIE")
                    .poster_path(image_BasePath + post_size[4] + movieDb.getPosterPath())
                    .build();

            resultList.add(searchResultDto);
        }

        return resultList;
    }

    public List<SearchResultDto> getTvRecommend(int id, String language, int page){

        List<SearchResultDto> resultList = new ArrayList<>();

        try{
            URL url = new URL("https://api.themoviedb.org/3/tv/" + Integer.toString(id) + "/recommendations?api_key=" + apiKey + "&language=" + language + "&page=" + Integer.toString(page));

            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));

            String result = br.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
            JSONArray totalResults = (JSONArray) jsonObject.get("results");

            if(totalResults.size() > 0){
                for(int i = 0; i < totalResults.size(); i++){
                    JSONObject tv = (JSONObject) totalResults.get(i);
                    String idString = tv.get("id").toString();
                    int tv_id = Integer.parseInt(idString);
                    String original_title = (String) tv.get("original_name");
                    String poster_path = image_BasePath + post_size[4] + (String) tv.get("poster_path");
                    String title = (String) tv.get("name");
                    String date = (String) tv.get("first_air_date");

                    SearchResultDto searchResultDto = SearchResultDto.builder()
                            .id(tv_id)
                            .original_title(original_title)
                            .title(title)
                            .date(date)
                            .media_type("TV_SERIES")
                            .poster_path(poster_path)
                            .build();

                    resultList.add(searchResultDto);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        finally {
            return resultList;
        }
    }

    public List<SearchResultDto> getTvSimilar(int id, String language, int page){

        List<SearchResultDto> resultList = new ArrayList<>();

        try{
            URL url = new URL("https://api.themoviedb.org/3/tv/" + Integer.toString(id) + "/similar?api_key=" + apiKey + "&language=" + language + "&page=" + Integer.toString(page));

            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));

            String result = br.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
            JSONArray totalResults = (JSONArray) jsonObject.get("results");

            if(totalResults.size() > 0){
                for(int i = 0; i < totalResults.size(); i++){
                    JSONObject tv = (JSONObject) totalResults.get(i);
                    String idString = tv.get("id").toString();
                    int tv_id = Integer.parseInt(idString);
                    String original_title = (String) tv.get("original_name");
                    String poster_path = image_BasePath + post_size[4] + (String) tv.get("poster_path");
                    String title = (String) tv.get("name");
                    String date = (String) tv.get("first_air_date");

                    SearchResultDto searchResultDto = SearchResultDto.builder()
                            .id(tv_id)
                            .original_title(original_title)
                            .title(title)
                            .date(date)
                            .media_type("TV_SERIES")
                            .poster_path(poster_path)
                            .build();

                    resultList.add(searchResultDto);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        finally {
            return resultList;
        }
    }

}
