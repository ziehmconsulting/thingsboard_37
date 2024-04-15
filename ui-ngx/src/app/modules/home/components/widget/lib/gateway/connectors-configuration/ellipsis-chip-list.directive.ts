///
/// Copyright © 2016-2024 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { isEqual } from '@core/utils';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tb-ellipsis-chip-list]'
})
export class EllipsisChipListDirective implements AfterViewInit, OnDestroy {

  chipsValue: string[];

  @Input('tb-ellipsis-chip-list')
  set chips(value: any[]) {
    if (!isEqual(this.chipsValue, value)) {
      this.chipsValue = value;
      setTimeout(() => {
        this.adjustChips();
      }, 0);
    }
  }

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private translate: TranslateService) {}

  ngAfterViewInit(): void {
    this.adjustChips();
    window.addEventListener('resize', this.adjustChips.bind(this));
  }

  private adjustChips(): void {
    const chipListElement = this.el.nativeElement;
    const ellipsisText = this.el.nativeElement.querySelector('.ellipsis-text');
    const chipNodes = chipListElement.querySelectorAll('mat-chip:not(.ellipsis-chip)');
    const ellipsisChip = this.el.nativeElement.querySelector('.ellipsis-chip');
    this.renderer.setStyle(ellipsisChip,'display', 'inline-flex');

    const margin = parseFloat(window.getComputedStyle(ellipsisChip).marginLeft) | 0;
    const availableWidth = chipListElement.offsetWidth - (ellipsisChip.offsetWidth + margin);
    let usedWidth = 0;
    let visibleChipsCount = 0;

    chipNodes.forEach((chip) => {
      this.renderer.setStyle(chip, 'display', 'inline-flex');
    });

    chipNodes.forEach((chip) => {
      if ((usedWidth + (chip.offsetWidth + margin) <= availableWidth) && (visibleChipsCount < this.chipsValue.length)) {
        visibleChipsCount++;
        usedWidth += chip.offsetWidth + margin;
      } else {
        this.renderer.setStyle(chip, 'display', 'none');
      }
    });

    ellipsisText.innerHTML = this.translate.instant('gateway.ellipsis-chips-text',
      {count: (this.chipsValue.length - visibleChipsCount)});

    if (visibleChipsCount === this.chipsValue?.length) {
      this.renderer.setStyle(ellipsisChip,'display', 'none');
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.adjustChips.bind(this));
  }
}
