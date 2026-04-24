import { TestBed } from '@angular/core/testing';
import * as Highcharts from 'highcharts';
import * as HighchartsGnatt from 'highcharts/highcharts-gantt';
import * as Highmaps from 'highcharts/highmaps';
import * as Highstock from 'highcharts/highstock';
import { ChartService, HIGHCHARTS_MODULES } from './chart.service';

describe('ChartService', () => {
  it('should not throw error when a module is an object', () => {
    const mockModule = {};
    TestBed.configureTestingModule({
      providers: [
        ChartService,
        { provide: HIGHCHARTS_MODULES, useValue: [mockModule] }
      ]
    });

    const service = TestBed.inject(ChartService);
    expect(() => service.initModules()).not.toThrow();
  });

  it('should call the module if it is a function', () => {
    const mockModule = jasmine.createSpy('mockModule');
    TestBed.configureTestingModule({
      providers: [
        ChartService,
        { provide: HIGHCHARTS_MODULES, useValue: [mockModule] }
      ]
    });

    const service = TestBed.inject(ChartService);
    service.initModules();
    expect(mockModule).toHaveBeenCalledWith(Highcharts);
    expect(mockModule).toHaveBeenCalledWith(Highstock);
    expect(mockModule).toHaveBeenCalledWith(Highmaps);
    expect(mockModule).toHaveBeenCalledWith(HighchartsGnatt);
  });

  it('should call the default function if module is an object with default', () => {
    const mockModuleFn = jasmine.createSpy('mockModuleFn');
    const mockModule = { default: mockModuleFn };
    TestBed.configureTestingModule({
      providers: [
        ChartService,
        { provide: HIGHCHARTS_MODULES, useValue: [mockModule] }
      ]
    });

    const service = TestBed.inject(ChartService);
    service.initModules();
    expect(mockModuleFn).toHaveBeenCalledWith(Highcharts);
    expect(mockModuleFn).toHaveBeenCalledWith(Highstock);
    expect(mockModuleFn).toHaveBeenCalledWith(Highmaps);
    expect(mockModuleFn).toHaveBeenCalledWith(HighchartsGnatt);
  });
});
