import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(
    private router: Router,
    private userSvc: UserService,

  ) {

  }

  ngOnInit() {
  }

  createDrawing(user) {
    this.userSvc.user.name = user.name;
    this.userSvc.user.host = true;
    this.userSvc.user.id = environment.uuid();
    this.userSvc.save();


    this.router.navigate(['/draw/', this.userSvc.user.id]);
  }

}
