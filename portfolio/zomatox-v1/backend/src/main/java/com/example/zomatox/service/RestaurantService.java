package com.example.zomatox.service;

import com.example.zomatox.entity.MenuItem;
import com.example.zomatox.entity.Restaurant;
import com.example.zomatox.exception.ApiException;
import com.example.zomatox.repository.MenuItemRepository;
import com.example.zomatox.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestaurantService {
  private final RestaurantRepository restaurantRepository;
  private final MenuItemRepository menuItemRepository;

  public Page<Restaurant> listRestaurants(String city, String q, String cuisine, String sort, int page, int size  ) {
    String citySafe = city == null ? "" : city.trim();
    String qSafe = q == null ? "" : q.trim();

    Pageable pageable = PageRequest.of(Math.max(page, 0), size, sortSpec(sort));
    Page<Restaurant> base;

    if (!qSafe.isBlank()) {
      base = restaurantRepository.findByCityContainingIgnoreCaseAndNameContainingIgnoreCase(citySafe, qSafe, pageable);
    } else {
      base = restaurantRepository.findByCityContainingIgnoreCase(citySafe, pageable);
    }

    if (cuisine == null || cuisine.isBlank()) return base;

    // simple in-memory filter for v1
    List<Restaurant> filtered = base.getContent().stream()
      .filter(r -> r.getCuisineType().equalsIgnoreCase(cuisine))
      .toList();

    return new PageImpl<>(filtered, pageable, filtered.size());
  }

  private Sort sortSpec(String sort) {
    if ("time".equalsIgnoreCase(sort)) return Sort.by(Sort.Direction.ASC, "deliveryTimeMin");
    return Sort.by(Sort.Direction.DESC, "ratingAvg");
  }

  public Restaurant getRestaurantOrThrow(Long id) {
    return restaurantRepository.findById(id).orElseThrow(() ->
      new ApiException(HttpStatus.NOT_FOUND, "Restaurant not found: " + id));
  }

  public List<MenuItem> getMenu(Restaurant r) {
    return menuItemRepository.findByRestaurantOrderByIdAsc(r);
  }
}
