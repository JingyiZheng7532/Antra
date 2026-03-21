import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface tabItem {
  id: number;
  title: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TabService {
  tabSub = new BehaviorSubject<tabItem[]>([]);
  tabList: tabItem[] = [];
  currTab!: tabItem;
  currTabSub = new Subject<tabItem>();

  registerNewTab(title: string) {
    let newTab = { id: this.tabList.length, title: title, active: false };
    this.tabList = [...this.tabList, newTab];
    this.tabList[0].active = true;
    this.currTab = this.tabList[0];

    this.tabSub.next(this.tabList);
    this.currTabSub.next(this.currTab);

    return newTab;
  }

  updateTabList(tabList: tabItem[]) {
    this.tabSub.next(tabList);
  }
  updateCurrTab(currTab: tabItem) {
    this.currTabSub.next(currTab);
  }
}
