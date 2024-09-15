package com.ishan.RestroFind.controller;

import com.ishan.RestroFind.model.Restaurant;
import com.ishan.RestroFind.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class AllRestaurantsController {

    @Autowired
    private RestaurantService restaurantService;

    // Endpoint for fetching paginated list of restaurants
    @GetMapping
    public ResponseEntity<Page<Restaurant>> getAllRestaurants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Restaurant> restaurants = restaurantService.getAllRestaurants(page, size);
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/location")
    public ResponseEntity<List<Restaurant>> getRestaurantsByLocation(
            @RequestParam double longitude,
            @RequestParam double latitude,
            @RequestParam double range) {
        List<Restaurant> restaurants = restaurantService.getRestaurantsByLocation(longitude, latitude, range);
        return ResponseEntity.ok(restaurants);
    }
}
