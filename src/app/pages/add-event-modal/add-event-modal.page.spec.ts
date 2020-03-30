import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEventModalPage } from './add-event-modal.page';

describe('AddEventModalPage', () => {
  let component: AddEventModalPage;
  let fixture: ComponentFixture<AddEventModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
