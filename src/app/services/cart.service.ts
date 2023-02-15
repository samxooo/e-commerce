import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart-item.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>( { items:[] } );

  constructor(private _snackbar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemsInCart = items.find((_item) => _item.id === item.id);

    if(itemsInCart) {
      itemsInCart.quantity +=1;
    }else {
      items.push(item)
    }

    this.cart.next({ items });
    this._snackbar.open('1 item added to cart.', 'ok', { duration: 3000 });
  }

  getTotal(item: Array<CartItem>): number {
    return item
    .map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackbar.open('Cart is clear!', 'ok',{
      duration: 3000
    } )
  }

  deleteItem(item: CartItem, update = true): Array<CartItem>{
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    )

    if(update) {
      this.cart.next({ items: filteredItems});
      this._snackbar.open('1 item removed from cart', 'ok', {
        duration: 3000
      })

    }
    return filteredItems ;
  }

  removeItem(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

   let filterItems = this.cart.value.items.map((_item) => {
      if(_item.id === item.id) {
        _item.quantity--;

        if(_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item
    })
    if(itemForRemoval) {
    }
    this.cart.next({items:filterItems})
    this._snackbar.open('1 item removed from cart!', 'ok', {
      duration: 3000
    });

  }
}
