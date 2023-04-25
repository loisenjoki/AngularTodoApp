import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from '../app/services/api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, HttpClientModule,FormsModule],
      providers: [ApiService]
    }).compileComponents();
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });


  

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  

  it('should have as title "Angular Todo app"', () => {
    expect(component.title ).toEqual('Angular Todo app');
  });

  afterEach(() => {
    httpMock.verify();
  });
});