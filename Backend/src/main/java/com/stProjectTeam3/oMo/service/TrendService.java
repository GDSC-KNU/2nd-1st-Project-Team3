package com.stProjectTeam3.oMo.service;

import com.stProjectTeam3.oMo.dto.SearchResultDto;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbMovies;
import info.movito.themoviedbapi.TmdbTV;
import info.movito.themoviedbapi.model.MovieDb;
import info.movito.themoviedbapi.model.tv.TvSeries;
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
import java.util.Objects;

@Service
public class TrendService {

    @Value("${tmdb.key}")
    String apiKey;

    /*public enum Media_Type{
        ALL("all"), MOVIE("movie"), TV("tv"), PERSON("person");

        private final String type;

        Media_Type(String type){
            this.type = type;
        }

        @Override
        public String toString() {
            return type;
        }
    }*/

    public enum Time_Window{
        DAY("day"), WEEK("week");

        private final String time;

        Time_Window(String time){
            this.time = time;
        }

        @Override
        public String toString() {
            return time;
        }
    }

    String image_BasePath = "https://image.tmdb.org/t/p/";
    String[] post_size = {"w92","w154","w185","w342","w500","w780","original"};

    public List<SearchResultDto> getTrend(/*Media_Type type,*/ Time_Window time){

        List<SearchResultDto> trendList = new ArrayList<>();

        try{
            URL url = new URL("https://api.themoviedb.org/3/trending/" + /*type.toString()*/
                    "all"+ "/" + time.toString() + "?api_key=" + apiKey);

            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));

            String result = br.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
            JSONArray totalResults = (JSONArray) jsonObject.get("results");

            if(totalResults.size() > 0){
                for(int i = 0; i < totalResults.size(); i++){
                    JSONObject content = (JSONObject) totalResults.get(i);

                    String media_type = (String)content.get("media_type");

                    if(media_type == null) continue;

                    String idString = content.get("id").toString();
                    int id = Integer.parseInt(idString);

                    if(Objects.equals(media_type, "movie")){

                        TmdbMovies tmdbMovies = new TmdbApi(apiKey).getMovies();
                        MovieDb movie = tmdbMovies.getMovie(id, "ko-KO");

                        SearchResultDto searchResultDto = SearchResultDto.builder()
                                .id(id)
                                .original_title(movie.getOriginalTitle())
                                .title(movie.getTitle())
                                .date(movie.getReleaseDate())
                                .media_type("MOVIE")
                                .poster_path(image_BasePath + post_size[4] + movie.getPosterPath())
                                .build();

                        trendList.add(searchResultDto);
                    }
                    else if (Objects.equals(media_type, "tv")){

                        TmdbTV tmdbTV = new TmdbApi(apiKey).getTvSeries();
                        TvSeries series = tmdbTV.getSeries(id, "ko-KO");

                        SearchResultDto searchResultDto = SearchResultDto.builder()
                                .id(id)
                                .original_title(series.getOriginalName())
                                .title(series.getName())
                                .date(series.getFirstAirDate())
                                .media_type("TV_SERIES")
                                .poster_path(image_BasePath + post_size[4] + series.getPosterPath())
                                .build();

                        trendList.add(searchResultDto);
                    }
                    else continue;
                }
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        finally {

            return trendList;
        }
    }
}
