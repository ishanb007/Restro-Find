package com.ishan.RestroFind.Utils;

public class RestaurantNotFoundException extends RuntimeException {
    public RestaurantNotFoundException(String id) {
        super("Restaurant with ID " + id + " not found.");
    }
}
