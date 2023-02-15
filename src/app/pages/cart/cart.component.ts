import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart-item.models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 3,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'mars',
        price: 2,
        quantity: 1,
        id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayList: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(item: Array<CartItem>): number {
    return this.cartService.getTotal(item);
  }

  onClearAll(): void  {
    this.cartService.clearCart()
  }

  onDeleteItem(item: CartItem): void {
    this.cartService.deleteItem(item)
  }

  onRemoveItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  onAddItem(item: CartItem) {
    this.cartService.addToCart(item);
  }
}
