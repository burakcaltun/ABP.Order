import type { CreateMasterDto, CustomerLookupDto, GetMasterListDto, MasterDto, ProductLookupDto, UpdateMasterDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiName = 'Default';
  

  create = (input: CreateMasterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MasterDto>({
      method: 'POST',
      url: '/api/app/master',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/master/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MasterDto>({
      method: 'GET',
      url: `/api/app/master/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCustomerLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<CustomerLookupDto>>({
      method: 'GET',
      url: '/api/app/master/customer-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetMasterListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<MasterDto>>({
      method: 'GET',
      url: '/api/app/master',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getProductLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<ProductLookupDto>>({
      method: 'GET',
      url: '/api/app/master/product-lookup',
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateMasterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MasterDto>({
      method: 'PUT',
      url: `/api/app/master/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
