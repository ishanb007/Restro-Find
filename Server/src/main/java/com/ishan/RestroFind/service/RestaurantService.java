package com.ishan.RestroFind.service;

import com.ishan.RestroFind.model.Restaurant;
import com.ishan.RestroFind.repo.RestaurantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepo restaurantRepo;

    public Optional<Restaurant> getRestaurantById(String id) {
        return restaurantRepo.findById(id);
    }

    public Page<Restaurant> getAllRestaurants(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return restaurantRepo.findAll(pageable);
    }

    public Page<Restaurant> getRestaurantsByLocation(double longitude, double latitude, double range, Pageable pageable) {
        return restaurantRepo.findRestaurantsByLocation(longitude, latitude, range*1000, pageable);
    }
}

