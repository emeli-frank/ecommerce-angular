import { TestBed } from '@angular/core/testing';

import { ProductCartCountResolverService } from './product-cart-count-resolver.service';

describe('ProductCartCountResolverService', () => {
  let service: ProductCartCountResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCartCountResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
