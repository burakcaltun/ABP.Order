import { Component , OnInit} from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { MasterService, MasterDto, CustomerLookupDto, ProductLookupDto } from '@proxy/masters';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class MasterComponent implements OnInit{
  master = { items: [], totalCount: 0 } as PagedResultDto<MasterDto>;



  form: FormGroup;

  selectedMaster = {} as MasterDto;

  customers$ : Observable<CustomerLookupDto[]>;

  products$ : Observable<ProductLookupDto[]>;

  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private masterService: MasterService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {
    this.customers$ = masterService.getCustomerLookup().pipe(map((r) => r.items))
  
    this.products$ = masterService.getProductLookup().pipe(map((r) => r.items))
  }

  ngOnInit(): void {
    const masterStreamCreator = (query) => this.masterService.getList(query);

    this.list.hookToQuery(masterStreamCreator).subscribe((response) => {
      this.master = response;
    });
  }

  createMaster() {
    this.selectedMaster = {} as MasterDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editMaster(id: string) {
    this.masterService.get(id).subscribe((master) => {
      this.selectedMaster = master;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      customerId: [this.selectedMaster.customerId || null, Validators.required],
      orderDate: [
        this.selectedMaster.orderDate ? new Date(this.selectedMaster.orderDate) : null,
        Validators.required,
      ],
      shippingAddress: [this.selectedMaster.shippingAddress || null, Validators.required],
      productId: [this.selectedMaster.productId || null, Validators.required],
      

    });
  }


  save() {
    debugger
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedMaster.id
    ? this.masterService.update(this.selectedMaster.id, this.form.value)
    : this.masterService.create(this.form.value);

  request.subscribe(() => {
    this.isModalOpen = false;
    this.form.reset();
    this.list.get();
  });

  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure')
        .subscribe((status) => {
          if (status === Confirmation.Status.confirm) {
            this.masterService.delete(id).subscribe(() => this.list.get());
          }
	    });
  }

  Shipped(id:any){
    this.masterService.get(id).subscribe((master) => {
      this.selectedMaster = master
      let data = {
        customerId : this.selectedMaster.customerId,
        orderDate : this.selectedMaster.orderDate,
        productId : this.selectedMaster.productId,
        shippingAddress: this.selectedMaster.shippingAddress,
        isShipped : true
      }
      this.masterService.update(this.selectedMaster.id, data).subscribe((res) => {
        const masterStreamCreator = (query) => this.masterService.getList(query);

        this.list.hookToQuery(masterStreamCreator).subscribe((response) => {
          this.master = response;
        });
      })
      // this.selectedMaster = master;
      // this.selectedMaster.isShipped = true;
      // this.masterService.update(master.id)
      // this.buildForm();
      // this.isModalOpen = true;
    });
  }


}
