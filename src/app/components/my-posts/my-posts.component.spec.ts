/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyPostsComponent } from './my-posts.component';

describe('MyPostsComponent', () => {
  let component: MyPostsComponent;
  let fixture: ComponentFixture<MyPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
