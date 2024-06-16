import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [SidenavComponent, LayoutComponent, NotFoundComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    SidenavComponent,
    LayoutComponent,
    NotFoundComponent,
    MaterialModule,
  ],
})
export class SharedModule {}
