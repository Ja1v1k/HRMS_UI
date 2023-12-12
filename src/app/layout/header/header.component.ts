import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() menuState = new EventEmitter(); //new
  @Input() flag: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  sideBarFlag: boolean = false
  closesideBarFlag: boolean = true
  showFirst: boolean = true;
  showMenu = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  toggleMenu() {
    this.showFirst = !this.showFirst
    console.log("inside toggleMenu");
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
 }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  menuType:any
  constructor(private route:Router){}
  isLoginError = new EventEmitter<boolean>(false)

  
  ngOnInit(): void {

    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') || val.url.includes('seller')){
          console.log("in seller Area")
          this.menuType='seller'
        }else{
          console.log("outside seller")
          this.menuType='default'
        }
      }
    })
  }

  onSignOut(){
    localStorage.clear();
   
     
    this.route.navigate(['login'])

  }
  addNewItem(value: boolean) {
    this.showFirst = !this.showFirst
    this.newItemEvent.emit(value);
  }
  closeTab(value: boolean) {
    this.showFirst = !this.showFirst
    this.newItemEvent.emit(value);
  }
}
