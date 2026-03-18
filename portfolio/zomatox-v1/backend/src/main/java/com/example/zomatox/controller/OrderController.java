package com.example.zomatox.controller;

import com.example.zomatox.dto.orders.CreateOrderRequest;
import com.example.zomatox.dto.orders.OrderResponse;
import com.example.zomatox.entity.User;
import com.example.zomatox.service.OrderService;
import com.example.zomatox.service.UserService;
import com.example.zomatox.util.RequestContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
  private final UserService userService;
  private final OrderService orderService;

  @PostMapping
  public OrderResponse create(@RequestHeader(value = "X-User-Id", required = false) String userId,
                              @Valid @RequestBody CreateOrderRequest req) {
    User u = RequestContext.requireUser(userService, userId);
    return orderService.createOrder(u, req.getAddressId());
  }

  @GetMapping
  public List<OrderResponse> list(@RequestHeader(value = "X-User-Id", required = false) String userId) {
    User u = RequestContext.requireUser(userService, userId);
    return orderService.listOrders(u);
  }

  @GetMapping("/{id}")
  public OrderResponse get(@RequestHeader(value = "X-User-Id", required = false) String userId,
                           @PathVariable("id") Long id) {
    User u = RequestContext.requireUser(userService, userId);
    return orderService.getOrder(u, id);
  }
}
