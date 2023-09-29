import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateCustomerDto {
  customerName: string;
  billingAddress: string;
  riskLimit: number;
}

export interface CustomerDto extends EntityDto<string> {
  customerName?: string;
  riskLimit: number;
  billingAddress?: string;
}
