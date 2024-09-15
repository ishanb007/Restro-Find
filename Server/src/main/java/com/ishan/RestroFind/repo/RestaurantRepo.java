package com.ishan.RestroFind.repo;

import com.ishan.RestroFind.model.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepo extends JpaRepository<Restaurant, String>, PagingAndSortingRepository<Restaurant, String> {
    @Query(value = "SELECT * FROM restaurants " +
            "WHERE ST_Distance_Sphere(POINT(longitude, latitude), POINT(:longitude, :latitude)) <= :range",
            countQuery = "SELECT COUNT(*) FROM restaurants " +
                    "WHERE ST_Distance_Sphere(POINT(longitude, latitude), POINT(:longitude, :latitude)) <= :range",
            nativeQuery = true)
    Page<Restaurant> findRestaurantsByLocation(
            @Param("longitude") double longitude,
            @Param("latitude") double latitude,
            @Param("range") double range,
            Pageable pageable);  // range in meters
}

