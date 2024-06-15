import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportParcelsComponent } from './import-parcels.component';

describe('ImportParcelsComponent', () => {
  let component: ImportParcelsComponent;
  let fixture: ComponentFixture<ImportParcelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportParcelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
