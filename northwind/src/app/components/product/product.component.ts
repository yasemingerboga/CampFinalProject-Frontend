import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryID']) {
        this.getProductsByCategory(params['categoryID']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryID: number) {
    this.productService
      .getProductsByCategory(categoryID)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }
  addToCart(product: Product) {
    if(product.unitsInStock===0){
      this.toastrService.error("Doesn't added to cart.",product.productName);
    }
    else{
      this.toastrService.success("Added to cart.",product.productName)
      this.cartService.addToCart(product);
    }
  }
}
