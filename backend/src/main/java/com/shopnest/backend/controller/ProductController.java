package com.shopnest.backend.controller;

import com.shopnest.backend.model.Product;
import com.shopnest.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Add a product
    @GetMapping("/add")
    public Product addProduct(@RequestParam String name,
                              @RequestParam String description,
                              @RequestParam Double price,
                              @RequestParam Integer stock,
                              @RequestParam String category,
                              @RequestParam String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setCategory(category);
        product.setImageUrl(imageUrl);
        return productRepository.save(product);
    }

    // Get product by id
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Delete product
    @GetMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "Product deleted!";
    }
}