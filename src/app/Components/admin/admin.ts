import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../Services/admin';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexLegend } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgApexchartsModule, CurrencyPipe],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class DashboardComponent implements OnInit {

  usersCount = 0;
  ordersCount = 0;
  productsCount = 0;
  totalRevenue = 0;
  loading = true;

  chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    legend: ApexLegend;
  } = {
    series: [],
    chart: { type: 'bar', height: 350 },
    xaxis: { categories: [] },
    yaxis: { title: { text: '' } },
    legend: { position: 'top' }
  };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getDashboardSummary().subscribe({
      next: (res: any) => {
        this.usersCount = res.usersCount;
        this.ordersCount = res.ordersCount;
        this.productsCount = res.productsCount;
        this.totalRevenue = res.totalRevenue;

        this.chartOptions = {
          series: [
            { name: 'Orders', data: res.revenueByDate.map((r: any) => r.totalOrders || 0) },
            { name: 'Revenue', data: res.revenueByDate.map((r: any) => r.totalRevenue || 0) }
          ],
          chart: { type: 'bar', height: 350 },
          xaxis: { categories: res.revenueByDate.map((r: any) => r._id) },
          yaxis: { title: { text: 'Counts / Revenue' } },
          legend: { position: 'top' }
        };

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard summary:', err);
        this.loading = false;
      }
    });
  }
}
