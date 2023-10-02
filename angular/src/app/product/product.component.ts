import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component,OnInit } from '@angular/core';
import { ProductService, ProductDto } from '@proxy/products';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ListService],
  
})
export class ProductComponent implements OnInit{
  product = {items: [] , totalCount: 0 } as PagedResultDto<ProductDto>;

  selectedProduct = {} as ProductDto;

  form: FormGroup;

  isModalOpen = false;
  
  constructor(
    public readonly list: ListService, 
    private productService: ProductService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService 
    ){}

  ngOnInit() {
    const productStreamCreator = (query) => this.productService.getList(query);

    this.list.hookToQuery(productStreamCreator).subscribe((response) => {
      this.product = response;
    })
  }

  

  createProduct() {
    this.selectedProduct = {} as ProductDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editProduct(id: string){
    this.productService.get(id).subscribe((product) => {
      this.selectedProduct = product;
      this.buildForm();
      this.isModalOpen = true;
    })
  }
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.productService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      productName: [this.selectedProduct.productName, Validators.required],
      amount: [null, Validators.required],
      price: ['', Validators.required]
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.selectedProduct.id) {
      this.productService
        .update(this.selectedProduct.id, this.form.value)
        .subscribe(() => {
          this.isModalOpen = false;
          this.form.reset();
          this.list.get();
        });
    } else {
      this.productService.create(this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      });
    }
  }
}
