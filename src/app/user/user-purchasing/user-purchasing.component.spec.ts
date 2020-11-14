import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchasingComponent } from './user-purchasing.component';

describe('UserPurchasingComponent', () => {
  let component: UserPurchasingComponent;
  let fixture: ComponentFixture<UserPurchasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPurchasingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPurchasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
