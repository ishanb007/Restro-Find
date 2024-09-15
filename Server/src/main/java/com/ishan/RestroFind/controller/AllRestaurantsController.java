package com.ishan.RestroFind.controller;

import com.ishan.RestroFind.model.Restaurant;
import com.ishan.RestroFind.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<Page<Restaurant>> getRestaurantsByLocation(
            @RequestParam double longitude,
            @RequestParam double latitude,
            @RequestParam double range,
            @RequestParam(defaultValue = "0") int page,  // Default to page 0
            @RequestParam(defaultValue = "10") int size) {  // Default size 10

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Restaurant> restaurants = restaurantService.getRestaurantsByLocation(longitude, latitude, range, pageRequest);
        return ResponseEntity.ok(restaurants);
    }
}
