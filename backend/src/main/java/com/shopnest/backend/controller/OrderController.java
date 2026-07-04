
package com.shopnest.backend.controller;

import com.shopnest.backend.model.Order;
import com.shopnest.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // Place an order
    @GetMapping("/place")
    public Order placeOrder(
            @RequestParam String customerName,
            @RequestParam String customerEmail,
            @RequestParam String productNames,
            @RequestParam Double totalAmount) {
        Order order = new Order();
        order.setCustomerName(customerName);
        order.setCustomerEmail(customerEmail);
        order.setProductNames(productNames);
        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }

    // Get all orders (Admin)
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get orders by email
    @GetMapping("/myorders")
    public List<Order> getMyOrders(@RequestParam String email) {
        return orderRepository.findByCustomerEmail(email);
    }

    // Update order status (Admin)
    @GetMapping("/status")
    public Order updateStatus(@RequestParam Long id,
                              @RequestParam String status) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }
}