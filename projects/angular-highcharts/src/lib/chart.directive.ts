/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 */
import { Directive, ElementRef, OnDestroy, OnInit, effect, inject, input } from '@angular/core';
import { Chart } from './chart';
import { MapChart } from './mapchart';
import { StockChart } from './stockchart';
import { HighchartsGantt } from './highcharts-gantt';

@Directive({
  selector: '[chart]',
  standalone: true
})
export class ChartDirective implements OnInit, OnDestroy {
  chart = input<Chart | StockChart | MapChart | HighchartsGantt | undefined>();

  private el = inject(ElementRef);

  constructor() {
    effect(() => {
      const chartValue = this.chart();
      if (chartValue) {
        this.destroy();
        this.init();
      }
    });
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private init() {
    const chartValue = this.chart();
    if (chartValue instanceof Chart || chartValue instanceof StockChart || chartValue instanceof MapChart
      || chartValue instanceof HighchartsGantt) {
      chartValue.init(this.el);
    }
  }

  private destroy() {
    const chartValue = this.chart();
    if (chartValue instanceof Chart || chartValue instanceof StockChart || chartValue instanceof MapChart
      || chartValue instanceof HighchartsGantt) {
      chartValue.destroy();
    }
  }
}
