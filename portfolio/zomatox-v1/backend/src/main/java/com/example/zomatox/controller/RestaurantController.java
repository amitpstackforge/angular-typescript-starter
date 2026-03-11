package com.example.zomatox.controller;

import com.example.zomatox.dto.restaurants.MenuItemResponse;
import com.example.zomatox.dto.restaurants.RestaurantResponse;
import com.example.zomatox.entity.Restaurant;
import com.example.zomatox.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {
  private final RestaurantService restaurantService;

  @GetMapping
  public Page<RestaurantResponse> list(
    @RequestParam(name = "city", required = false) String city,
    @RequestParam(name = "q", required = false) String q,
    @RequestParam(name = "cuisine", required = false) String cuisine,
    @RequestParam(name = "sort", required = false, defaultValue = "rating") String sort,
    @RequestParam(name = "page", required = false, defaultValue = "0") int page,
    @RequestParam(name = "size", required = false, defaultValue = "10") int size   // ✅ new

  ) {
    Page<Restaurant> res = restaurantService.listRestaurants(city, q, cuisine, sort, page,size);
    return res.map(RestaurantResponse::from);
  }

  @GetMapping("/{id}")
  public RestaurantResponse get(@PathVariable("id") Long id) {
    return RestaurantResponse.from(restaurantService.getRestaurantOrThrow(id));
  }

  @GetMapping("/{id}/menu")
  public List<MenuItemResponse> menu(@PathVariable("id") Long id) {
    Restaurant r = restaurantService.getRestaurantOrThrow(id);
    return restaurantService.getMenu(r).stream().map(MenuItemResponse::from).toList();
  }

}
