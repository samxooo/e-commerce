import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent implements OnInit{
  @Output() listCountChange = new EventEmitter<number>;
  @Output() itemCountChange = new EventEmitter<number>;
  @Output() srotChange = new EventEmitter<string>;

  sort = "desc";
  itemsShowCount = 12;

  constructor() { }

  ngOnInit(): void {

  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.srotChange.emit(newSort)
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemCountChange.emit(count)
  }

  onListUpdated(listNumber: number): void {
    this.listCountChange.emit(listNumber)
  }
}
