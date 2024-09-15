package com.ishan.RestroFind.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "restaurants")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Restaurant {

    @Id
    @Column(name = "restaurant_id")
    private String restaurantId;

    private String name;

    private BigDecimal latitude;

    private BigDecimal longitude;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String city;

    private String locality;

    @Column(name = "country_id")
    private Integer countryId;

    @Column(columnDefinition = "JSON")
    private String cuisines;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "rating_text")
    private String ratingText;

    @Column(name = "rating_color")
    private String ratingColor;

    @Column(name = "aggregate_rating", precision = 3, scale = 2)
    private BigDecimal aggregateRating;

    @Column(name = "average_cost_for_two")
    private Integer averageCostForTwo;

    private String currency;

    @Column(name = "has_table_booking")
    private Boolean hasTableBooking;

    @Column(name = "photo_url", columnDefinition = "TEXT")
    private String photoUrl;

    @Column(name = "menu_url", columnDefinition = "TEXT")
    private String menuUrl;

    @Column(name = "book_url", columnDefinition = "TEXT")
    private String bookUrl;

}
