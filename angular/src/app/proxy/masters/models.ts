import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateMasterDto {
  orderDate: string;
  shippingAddress: string;
  isShipped: boolean;
  productId?: string;
  customerId?: string;
}

export interface CustomerLookupDto extends EntityDto<string> {
  customerName?: string;
}

export interface GetMasterListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface MasterDto extends EntityDto<string> {
  orderDate?: string;
  shippingAddress?: string;
  isShipped: boolean;
  productId?: string;
  productName?: string;
  customerId?: string;
  customerName?: string;
}

export interface ProductLookupDto extends EntityDto<string> {
  productName?: string;
}

export interface UpdateMasterDto {
  orderDate: string;
  shippingAddress: string;
  isShipped: boolean;
  productId?: string;
  customerId?: string;
}
