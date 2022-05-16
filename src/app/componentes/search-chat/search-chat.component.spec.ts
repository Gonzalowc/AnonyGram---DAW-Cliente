import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChatComponent } from './search-chat.component';

describe('SearchChatComponent', () => {
  let component: SearchChatComponent;
  let fixture: ComponentFixture<SearchChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
