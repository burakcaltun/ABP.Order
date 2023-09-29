import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetCustomerListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetProductListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
