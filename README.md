# Order System

## Overview
This order system is being developed using React. It provides the basic interactive operations about making orders, such as selecting different product categories, entering the optional customer name, displaying the saved results, etc.

![alt text](https://github.com/Yu-Xueting/order-system/blob/master/docs/workflow.gif "common workflow")

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

        //...
}
```

### Common workflow
* Click on the button "Add New Product" ==> The corresponding form shows below, the customer ID updates automaticaly

* Select the expected product on the left pane ==> The product name and price get updated in the form

* Click on the save button ==> The product information is printed on the top. If the optional customer name was assigned, it displays next to the customer Id
