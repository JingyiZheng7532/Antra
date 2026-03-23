import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { jobInfoItem, JobService } from '../services/job-service';

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {
  hasBeenDisplayed: Set<number> = new Set();
  jobList: jobInfoItem[] = [];
  constructor(
    private jobService: JobService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.jobService.getJobStories().subscribe((res) => {
      console.log('res: ', res);
      this.jobList = res.map((item, index) => ({ ...item, display: index < 6 ? true : false }));
      for (let job of this.jobList) {
        if (job.display) {
          this.hasBeenDisplayed.add(job.id);
        }
      }
      this.cdr.detectChanges();
    });
  }

  loadMore() {
    let originalSize = this.hasBeenDisplayed.size;
    for (let i = originalSize; i < this.jobList.length && i < originalSize + 6; i++) {
      this.jobList[i].display = true;
      this.hasBeenDisplayed.add(this.jobList[i].id);
    }
    if (this.hasBeenDisplayed.size > originalSize) {
      this.cdr.detectChanges();
    }
  }
}
