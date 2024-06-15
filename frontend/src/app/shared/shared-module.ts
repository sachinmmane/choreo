import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent, LayoutComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [SidenavComponent, LayoutComponent, MaterialModule],
})
export class SharedModule {}
