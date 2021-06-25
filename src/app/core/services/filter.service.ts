import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { FilterDialogComponent, FilterDialogData } from 'src/app/catalog/filter-dialog/filter-dialog.component';
import { Filter } from 'src/app/shared/interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private dialog: MatDialog) { }

  showFilter(currentFilter: Filter, advanced = false): Observable<Filter> {
    const data: FilterDialogData = {advanced: advanced, currentFilter: currentFilter}
    const filterSub = new Subject<Filter>();
    const filter$ = filterSub.asObservable();

    this.dialog.open(FilterDialogComponent, {
      width: '85%',
      maxWidth: '500px',
      data: data,
    }).afterClosed()
    .subscribe(filter => {
      if (filter) {
        filterSub.next(filter);
        filterSub.complete();
      } else {
        filterSub.complete();
      }
    });

    return filter$;
  }
}
