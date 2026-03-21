import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { tabItem, TabService } from '../services/tab-service';

@Component({
  selector: 'app-tab',
  standalone: false,
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
})
export class Tab implements OnInit {
  @Input() title: string = '';
  active: boolean = false;
  tab: tabItem | undefined;

  constructor(private tabService: TabService) {}

  ngOnInit(): void {
    this.tab = this.tabService.registerNewTab(this.title);

    this.tabService.currTabSub.subscribe((currTab) => {
      this.active = currTab.id === this.tab?.id;
    });
  }
}
