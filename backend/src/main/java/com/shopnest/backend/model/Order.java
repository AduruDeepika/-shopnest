
package com.shopnest.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerEmail;
    private String productNames;
    private Double totalAmount;
    private String status;
    private LocalDateTime orderDate;

    @PrePersist
    public void prePersist() {
        orderDate = LocalDateTime.now();
        status = "PENDING";
    }
}