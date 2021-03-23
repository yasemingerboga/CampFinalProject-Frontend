import { Injectable } from '@angular/core';
import { CartItems } from '../models/cartItem';
import { CartItem } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: Product) {
    let item = CartItems.find((c) => c.product.productID === product.productID);
    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }
  removeFromCart(product:Product){
    let item = CartItems.find((c) => c.product.productID === product.productID);
    CartItems.splice(CartItems.indexOf(item),1);
  }
  list(): CartItem[] {
    return CartItems;
  }
}
