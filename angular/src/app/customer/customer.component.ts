import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component,OnInit } from '@angular/core';
import { CustomerService, CustomerDto } from '@proxy/customers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [ListService],
  
})
export class CustomerComponent implements OnInit{
  customer = {items: [] , totalCount: 0 } as PagedResultDto<CustomerDto>;

  selectedCustomer = {} as CustomerDto;

  form: FormGroup;

  isModalOpen = false;
  
  constructor(
    public readonly list: ListService, 
    private customerService: CustomerService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService 
    ){}

  ngOnInit() {
    const customerStreamCreator = (query) => this.customerService.getList(query);

    this.list.hookToQuery(customerStreamCreator).subscribe((response) => {
      this.customer = response;
    })
  }

  

  createCustomer() {
    this.selectedCustomer = {} as CustomerDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editCustomer(id: string){
    this.customerService.get(id).subscribe((customer) => {
      this.selectedCustomer = customer;
      this.buildForm();
      this.isModalOpen = true;
    })
  }
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.customerService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      riskLimit: [null, Validators.required],
      billingAddress: ['', Validators.required]
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedCustomer.id
      ? this.customerService.update(this.selectedCustomer.id, this.form.value)
      : this.customerService.create(this.form.value);

    


    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }
}
