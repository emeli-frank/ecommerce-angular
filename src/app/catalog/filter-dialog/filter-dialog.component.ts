import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filter } from 'src/app/shared/interfaces/filter';

export interface FilterDialogData {
  advanced: boolean;
  currentFilter: Filter;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  advanced = false;
  form: FormGroup;

  get label(): string { return this.advanced ? "Apply" : "Search" }

  get search() { return this.form.get('search'); }

  get minPrice() { return this.form.get('minPrice'); }

  get maxPrice() { return this.form.get('maxPrice'); }

  get discount() { return this.form.get('discount'); }

  constructor(private dialogRef: MatDialogRef<FilterDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: FilterDialogData) {
      this.advanced = this.data?.advanced || false;
    }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(this.data.currentFilter?.search),
      minPrice: new FormControl(this.data.currentFilter?.minPrice),
      maxPrice: new FormControl(this.data.currentFilter?.maxPrice),
      discount: new FormControl(this.data.currentFilter?.discount),
    });
  }

  returnFilter() {
    const filter: Filter = {}

    if (this.search.value) {
      filter.search = this.search.value;
    }

    const minPrice = +this.minPrice.value;
    if (minPrice) {
      filter.minPrice = minPrice;
    }

    const maxPrice = +this.maxPrice.value;
    if (maxPrice) {
      filter.maxPrice = maxPrice;
    }

    const discount = +this.discount.value;
    if (discount) {
      filter.discount = discount;
    }

    this.dialogRef.close(filter);
  }

}
