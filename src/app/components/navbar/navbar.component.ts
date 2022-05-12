import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  usuario;
  constructor(location: Location,http: HttpClient,  private element: ElementRef, private router: Router) {
    this.location = location;
    http
      .get("https://paep22-backend.herokuapp.com/user/diegoaranab@gmail.com")
      .subscribe((response) => {
        this.usuario = response;
      });
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var title = this.location.prepareExternalUrl(this.location.path());
    if(title.charAt(0) === '#'){
        title = title.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === title){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
