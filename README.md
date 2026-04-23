# angular-highcharts

[![NPM version](https://img.shields.io/npm/v/angular-highcharts.svg)](https://npmjs.org/package/up2date-angular-highcharts)
[![NPM downloads](https://img.shields.io/npm/dt/angular-highcharts.svg)](https://npmjs.org/package/up2date-angular-highcharts)

This is a directive for an easy usage of [Highcharts](https://www.highcharts.com/) with Angular.

## Requirements

```json
{
  "angular": "^21.0.0",
  "highcharts": "^11.4.8"
}
```

## Installation

### npm

```bash
# install angular-highcharts and highcharts
npm i --save angular-highcharts highcharts
```

### yarn

```bash
# install angular-highcharts and highcharts
yarn add angular-highcharts highcharts
```

## Usage Example

### Standalone (Recommended)

Since version 21, `ChartDirective` is **standalone**. You can import it directly into your components.

```typescript
// chart.component.ts
import { Component } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule], // or just [ChartDirective]
  template: `
    <button (click)="add()">Add Point!</button>
    <div [chart]="chart"></div>
  `
})
export class ChartComponent {
  chart = new Chart({
    chart: { type: 'line' },
    title: { text: 'Linechart' },
    series: [{
      name: 'Line 1',
      data: [1, 2, 3]
    }]
  });

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}
```

### Zoneless Support

This library fully supports **Angular Zoneless** mode. In your `main.ts`, you can bootstrap your application without `zone.js`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection()
  ]
});
```

## Using Highcharts modules

To use Highcharts modules, provide them using the `HIGHCHARTS_MODULES` token.

```typescript
// main.ts or app.config.ts
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
  ]
});
```

**Note:** Don't forget to use the modules with the `.src` suffix for better compatibility with modern bundlers.

## API Docs

### Chart

The Chart object.

Type: `class`

#### Constructor

```typescript
new Chart(options: Options)
```

#### Properties

```typescript
ref: Highcharts.Chart;
```

Deprecated. Please use `ref$`.

```typescript
ref$: Observable<Highcharts.Chart>;
```

Observable that emits a Highcharts.Chart - [Official Chart API Docs](https://api.highcharts.com/class-reference/Highcharts.Chart)

#### Methods

```typescript
addPoint(point: Point, [serieIndex: number = 0]): void
```

Adds a point to a serie

```typescript
removePoint(pointIndex: number, [serieIndex: number = 0], [redraw: boolean = true], [shift: boolean = false]): void
```

Removes a point from a serie

```typescript
addSeries(series: ChartSerie): void
```

Adds a series to the chart

```typescript
removeSeries(seriesIndex: number): void
```

Remove series from the chart

### StockChart

The Chart object.

Type: `class`

#### Constructor

```typescript
new StockChart(options);
```

#### Properties

```typescript
ref: Highstock.Chart;
```

Deprecated. Please use `ref$`.

```typescript
ref$: Observable<Highstock.Chart>;
```

Observable that emits a Highstock.Chart

### MapChart

The Chart object.

Type: `class`

#### Constructor

```typescript
new MapChart(options);
```

#### Properties

```typescript
ref;
```

Deprecated. Please use `ref$`.

```typescript
ref$;
```

Observable that emits a Highmaps.Chart

## Troubleshooting

### Compile Issues

If you expiring typing errors while you build/serve your angular app the following could be helpful:

```ts
// override options type with <any>
chart = new Chart({ options } as any);
```

This is very useful when using `gauge chart` type.

### Loading Highcharts Modules manually

See Official Highcharts Docs: http://www.highcharts.com/docs/getting-started/install-from-npm
