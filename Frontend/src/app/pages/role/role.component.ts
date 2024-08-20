import { Component, OnInit } from '@angular/core';
import { DynamicMenuService } from '@services/dynamic-menu.service';
import { MenuService } from '@services/menu.service';
import { listTransition } from '../../theme/utils/app-animation';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerticalMenuComponent } from '../../theme/components/menu/vertical-menu/vertical-menu.component';
import { Menu } from '../../common/models/menu.model';
import { debounceTime, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { RoleService } from '@services/role.service';
import { PageEvent } from '@angular/material/paginator';
import { Role } from '../../common/interfaces/role';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  providers: [ DynamicMenuService, MenuService ],
  animations: [ listTransition ],
  host: {
    '[@listTransition]': ''
  }
})
export class RoleComponent implements OnInit { 
  public menuItems: Array<Menu>;
  public icons = ['home','person', 'card_travel', 'delete', 'event', 'favorite', 'help' ]
  public form: FormGroup;
  constructor(public formBuilder: FormBuilder, 
              public snackBar: MatSnackBar,
              private menuService: MenuService,
              private dynamicMenuService: DynamicMenuService,
              private roleService:RoleService) { 
    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  ngOnInit() {
    this.getRoles()
    this.form = this.formBuilder.group({
      'roleName': ['', Validators.required]  
      // 'title': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      // 'icon': null,
      // 'routerLink': ['', Validators.required],    
      // 'href': ['', Validators.required],            
      // 'target': null,
      // 'hasSubMenu': false,
      // 'parentId': 0
    });
  }

  ngAfterViewInit() {
   
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.getRawValue())
      this.roleService.addRole(this.form.getRawValue()).subscribe((res)=>{
        console.log(res)
      });
      this.snackBar.open('New menu item added successfully!', undefined, {
        duration: 2000,
      });
      this.form.reset({
        hasSubMenu:false,
        parentId:0
      });     
    }
  } 
  roles: Role[] = []
  filterValue: string = '';
  roleSub!: Subscription;
  submittingForm: boolean = false;
  getRoles() {
    this.submittingForm = true;
    this.roleSub = this.roleService.getRole(this.filterValue, this.currentPage, this.pageSize).subscribe((res: any) => {
      this.submittingForm = false;
      this.roles = res.items;
      this.totalItems = res.count;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValue = filterValue;
    this.getRoles();
  }

  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getRoles();
  }
}


