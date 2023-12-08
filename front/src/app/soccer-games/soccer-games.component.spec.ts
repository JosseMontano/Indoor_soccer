import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerGamesComponent } from './soccer-games.component';

describe('SoccerGamesComponent', () => {
  let component: SoccerGamesComponent;
  let fixture: ComponentFixture<SoccerGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoccerGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoccerGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
