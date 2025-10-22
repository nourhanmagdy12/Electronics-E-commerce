import { Component, signal } from '@angular/core';
import { FooterComponent } from './Components/footer/footer';
import { Navbar } from './Components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { NgApexchartsModule } from 'ng-apexcharts';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, Navbar, Header, RouterOutlet, NgApexchartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Electronics-E-commerce');
}
export const appProviders = [ ];
