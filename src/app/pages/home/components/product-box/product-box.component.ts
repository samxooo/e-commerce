import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.mode';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addtoCart = new EventEmitter();

  constructor() { }

  addToCart(): void {
    this.addtoCart.emit(this.product)
  }
}
