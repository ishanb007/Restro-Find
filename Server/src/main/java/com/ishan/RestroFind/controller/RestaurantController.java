package com.ishan.RestroFind.controller;

import com.ishan.RestroFind.Utils.RestaurantNotFoundException;
import com.ishan.RestroFind.model.Restaurant;
import com.ishan.RestroFind.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable String id) {
        Restaurant restaurant = restaurantService.getRestaurantById(id)
                .orElseThrow(() -> new RestaurantNotFoundException(id));;

        return ResponseEntity.ok(restaurant);
    }
}
