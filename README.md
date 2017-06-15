# Order System

## Overview
This order system is being developed using React. It provides the basic interactive operations about making orders, such as selecting different product categories, entering the optional customer name, displaying the saved results, etc.

![alt text](https://github.com/Yu-Xueting/order-system/blob/master/docs/overview.png "overview")

## Features

### Reusable tree menu component
The tree menu on the left pane is a reusable component, which converts the JSON data into the tree structure. The expected JSON format is
```
{
    "product_categories": [
        {
            "product_category_id": 1,
            "product_category_name": "Chocolate Beverage",
            "price": 15,
            "next_product_categories": [
                {
                    "product_category_id": 2,
                    "product_category_name": "Hot Chocolate",
                    "price": 10
                },
```

### Ability to add new product

