import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateProductDto {
  productName: string;
  amount: number;
  price: number;
}

export interface ProductDto extends EntityDto<string> {
  productName?: string;
  amount: number;
  price: number;
}
