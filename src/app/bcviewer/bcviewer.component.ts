import { Component, OnInit } from '@angular/core';
import { Http,Response,HttpModule, Headers,RequestOptions} from '@angular/http';
import {Router } from '@angular/router';
import {FormsModule } from '@angular/forms';
import {DataTableModule} from "angular2-datatable";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-bcviewer',
  templateUrl: './bcviewer.component.html',
  styleUrls: ['./bcviewer.component.css']
})
export class BcviewerComponent implements OnInit {

responsedata: any[];transaction;
  constructor(private http: Http, private router: Router) { 
  this.http.get(environment.composerExplorer + "/api/queries/selectAllTransactions").subscribe(res => {
    this.responsedata= res.json();
    console.log(this.responsedata);
    
    this.responsedata.sort(function(n1, n2) {
      if (n1.transactionTimestamp > n2.transactionTimestamp) {
          return -1;
      } else if (n1.transactionTimestamp < n2.transactionTimestamp) {
          return 1;
      } else {
          return 0;
      }
  }); 
  },err=>(

           alert("somthing went wrong")
         ));

  
 }
  ngOnInit() {
  }
  calltrans(val) {
    // alert(timeshow);
      if(val=="org.hmlr.model.UpdateContract"){this.transaction="Contract created by Seller"}
      else if(val=="org.hmlr.model.UpdateContractCompletionDate"){this.transaction="Contract target completion date set"}
      else if(val=="org.hmlr.model.ApproveContract"){this.transaction="Contract approved (by Buyer / Seller)"}
      else if(val=="org.hmlr.model.UpdatePropertyExchange"){this.transaction="Property exchange initiated"}
      else if(val=="org.hmlr.model.ConfirmPayment"){this.transaction="Payment receipt"}
      else if(val=="org.hmlr.model.ConfirmDepositPayment"){this.transaction="Deposit funds received by Escrow"}
      else if(val=="org.hmlr.model.ConfirmMortgagePayment"){this.transaction="Mortgage funds received by Escrow"}
      else if(val=="org.hmlr.model.ConfirmAdditionalFundsPayment"){this.transaction="Additional funds received by Escrow"}
      else if(val=="org.hmlr.model.ConfirmEscrowPayoutReceipt"){this.transaction="Escrow funds transferred to Seller"}
      else if(val=="org.hmlr.model.LockProperty"){this.transaction="HMLR property lock (exchange in process)"}
      else if(val=="org.hmlr.model.UpdatePropertyExchangeStatus"){this.transaction="Property exchange update"}
      else if(val=="org.hmlr.model.PropertyCheckCompleted"){this.transaction="Lender property checks completed"}
      else if(val=="org.hmlr.model.MortgageApproved"){this.transaction="Lender approved mortgage on property"}
      else{this.transaction=""}
    return this.transaction;
}

}
