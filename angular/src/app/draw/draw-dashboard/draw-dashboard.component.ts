import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DrawService, DrawingStroke } from '../draw.service';
import { PostionEvent } from '../draw-canvas-event/draw-canvas-event.component';

@Component({
  selector: 'app-draw-dashboard',
  templateUrl: './draw-dashboard.component.html',
  styleUrls: ['./draw-dashboard.component.css']
})
export class DrawDashboardComponent implements OnInit {

  private id: string;

  constructor(
    public userSvc: UserService,
    private activatedRoute: ActivatedRoute,
    public drawService: DrawService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log('params', params);
      this.id = params.get('id');
      this.userSvc.user.meetingUUID = this.id;
      this.userSvc.save();

      if (this.userSvc.user.host) {
        this.drawService.hostDrawingSession(this.userSvc.user);
      } else if (this.userSvc.user.name) {
        // this.quizService.init(this.quizId);
        // this.quizService.addPlayer(this.quizId, this.userSvc.user);
        this.drawService.joinDrawingGroup(this.userSvc.user);
      }

    });
  }

  joinDrawing(event) {
    this.userSvc.user.host = false;
    this.userSvc.user.name = event.name;
    this.userSvc.save()
    this.drawService.joinDrawingGroup(this.userSvc.user);
  }

  drawEvent(event: DrawingStroke) {
    event.userUUID = this.userSvc.user.id;
    this.drawService.sendDrawEvent(this.id, event);

    //this.drawService.drawEvent.next(event);
  }

}
