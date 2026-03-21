import { Component, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { tabItem, TabService } from '../services/tab-service';

@Component({
  selector: 'app-tab-group',
  standalone: false,
  templateUrl: './tab-group.html',
  styleUrl: './tab-group.scss',
})
export class TabGroup implements AfterContentInit {
  tabList: tabItem[] = [];
  currTab!: tabItem;
  constructor(
    private tabService: TabService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentInit(): void {
    this.tabService.tabSub.subscribe((res) => {
      this.tabList = res;
      this.cdr.detectChanges();
    });
    this.tabService.currTabSub.subscribe((res) => {
      this.currTab = res;
    });
  }

  selectTab(selectedTab: tabItem) {
    this.currTab = selectedTab;
    this.tabList.forEach((tab) => {
      if (tab.id !== selectedTab.id) {
        tab.active = false;
      } else {
        tab.active = true;
      }
    });
    this.tabService.updateTabList(this.tabList);
    this.tabService.updateCurrTab(this.currTab!);
  }
}
