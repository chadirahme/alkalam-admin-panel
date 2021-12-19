import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StoreSummary } from '../entity/store-summary';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  //miniCardData: StoreSummary[] | undefined;
  miniCardData: StoreSummary[]=[
    // {title:'aaa' , value:10, isIncrease:true, color:'red' , percentValue:30 , isCurrency:true , icon:'home'},
    // {title:'bbb' , value:101, isIncrease:false, color:'green' , percentValue:30 , isCurrency:true , icon:'home'},
    // {title:'bbb' , value:10, isIncrease:true, color:'red' , percentValue:30 , isCurrency:true , icon:'home'},
    // {title:'bbb' , value:10, isIncrease:true, color:'red' , percentValue:30 , isCurrency:true , icon:'home'},
    
  ];

  constructor(private breakpointObserver: BreakpointObserver,
    public authService: AuthService) 
    {

    }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
     this.getAllInvoicesCount();
  }

  getAllInvoicesCount() : void {
    //item: StoreSummary;
    
    // this.authService.getAllInvoicesCount(0).subscribe((data: number)=>{
    // let item=new StoreSummary();
    // item.value=data;
    // item.title="All Invoices";
    // item.isIncrease=true;
    // item.color='green';
    // item.isCurrency=true;
    // this.miniCardData.push(item);
    // });
    
    this.authService.getAllInvoicesCount(1).subscribe((data: number)=>{
      let item=new StoreSummary();
      item.title="DAR AL ARKAM";
      item.value=data;
      item.isIncrease=true;
      item.color='green';
      item.isCurrency=true;
      this.miniCardData.push(item);
    });
    
    this.authService.getAllInvoicesCount(2).subscribe((data: number)=>{
      let item=new StoreSummary();
      item.title="DAR AL KALAM";
      item.value=data;
      item.isIncrease=true;
      item.color='green';
      item.isCurrency=true;
      this.miniCardData.push(item);
    });

    this.authService.getAllInvoicesCount(3).subscribe((data: number)=>{
      let item=new StoreSummary();
      item.title="DREAM LAND"
      item.value=data;
      item.isIncrease=true;
      item.color='green';
      item.isCurrency=true;
      this.miniCardData.push(item);
    });

    this.authService.getAllInvoicesCount(4).subscribe((data: number)=>{
      let item=new StoreSummary();
      item.title="Other COMPANY"
      item.value=data;
      item.isIncrease=true;
      item.color='green';
      item.isCurrency=true;
      this.miniCardData.push(item);
    });

  }

}
