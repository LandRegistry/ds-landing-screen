import { Component, OnInit } from '@angular/core';
import { Http,Response,HttpModule, Headers,RequestOptions} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule } from '@angular/forms';
import {DataTableModule} from "angular2-datatable";

@Component({
  selector: 'app-landingpg',
  templateUrl: './landingpg.component.html',
  styleUrls: ['./landingpg.component.css']
})
export class LandingpgComponent implements OnInit {
  responsedata_status;status;responsedata;prop;conf;cont;data2;address;preext=false;preexf=false;excht=false;exchf=false;compt=false;compf=false;
  sfirstname;slastname;bfirstname;blastname;responsedata1;responsedata2;bmit=false;bmif=false;rut=false;ruf=false;
  responsedatapop: any[];
  constructor(public http: Http, private router: Router,private route: ActivatedRoute) { 
    this.data2=localStorage.getItem("data2");
    this.prop="https://hmlr-ds-transactionui.eu-gb.mybluemix.net/#/property/contract"+this.data2;
    console.log("url",this.prop);
    this.conf="https://hmlr-ds-transactionui.eu-gb.mybluemix.net/#/confirm/contract"+this.data2;
    console.log("url",this.conf);
    this.cont="https://hmlr-ds-transactionui.eu-gb.mybluemix.net/#/contract/100000002/100000008/" + this.data2;
    console.log("url",this.cont);
    this.address = {
      firstLine: '21 Cotham Lawn Road',
      city: 'Bristol'
    }
    var data = {
      type:"PropertyExchange",
      id:"propertyExchange".concat(this.data2),
      user:"admin"	

  }

  let headers = new Headers({
    'Content-Type': 'application/json'
  });
  let options = new RequestOptions({
    headers: headers
  });
  let body = JSON.stringify(data);

  console.log("body",body);
  this.preexf=true;
  this.exchf=true;
  this.compf=true;
  this.bmif=true;
  this.ruf=true;
  this.http.post("https://hmlr-ds-transactionapi.eu-gb.mybluemix.net/api/get/asset/", body, options).subscribe(res => {

    this.responsedata_status= res.json();
    console.log("responsedata",this.responsedata_status);
    this.status=this.responsedata_status.status;
    console.log("status",this.status);
   if(this.status=="CONTRACT_CREATED"){
     console.log("entering preexchange");
     this.preext=true;
     this.preexf=false;

   }
   else if(this.status=="CONTRACT_SIGNED"){
    console.log("entering exchanged");
    this.preext=true;
     this.excht=true;
     this.preexf=false;
     this.exchf=false;
     this.conf="https://hmlr-ds-transactionui.eu-gb.mybluemix.net/#/signfail/"+this.data2;
   }
   else if(this.status=="PAYMENT_COMPLETED"){
    console.log("entering completed");
    this.preext=true;
    this.excht=true;
    this.compt=true;
    this.preexf=false;
    this.exchf=false;
    this.compf=false;
  }
  else if(this.status=="BUYER_MOVES_IN"){
    console.log("entering buyer moves in");
    this.preext=true;
    this.excht=true;
    this.compt=true;
    this.bmit=true;
    this.preexf=false;
    this.exchf=false;
    this.compf=false;
    this.bmif=false;
  }
  else if(this.status=="REGISTRY_UPDATED"){
    console.log("entering registry updated");
    this.preext=true;
    this.excht=true;
    this.compt=true;
    this.bmit=true;
    this.rut=true;
    this.preexf=false;
    this.exchf=false;
    this.compf=false;
    this.bmif=false;
    this.ruf=false;
  }
  else{
    console.log("entering else");
    this.preexf=true;
    this.exchf=true;
    this.compf=true;
  }
  });
  this.http.get("http://169.51.23.118:31090/api/queries/selectAllTransactions").subscribe(res => {
    this.responsedatapop= res.json();
    console.log(this.responsedatapop);
    console.log(this.responsedatapop[0].transactionType);
    
    this.responsedatapop.sort(function(n1, n2) {
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
    

    // var buyerRequest = JSON.stringify({
    //   type: "Buyer",
    //   id: "100000008",
    //   user: "admin"
    // });

    var data1 = {
      type: "Buyer",
      id: "100000008",
      user: "admin"
  } 

  let headers1 = new Headers({
    'Content-Type': 'application/json'
});
let options1 = new RequestOptions({
    headers: headers1
});
let body1 = JSON.stringify(data1); 

console.log(body1);

this.http.post('https://hmlr-ds-transactionapi.eu-gb.mybluemix.net/api/get/participant', body1, options1).subscribe(res => {
  
 this.responsedata1= res.json();
 console.log(this.responsedata1);
 console.log(this.responsedata1.saleParticipantFirstName);
 console.log(this.responsedata1.saleParticipantLastName);
 
   this.bfirstname=this.responsedata1.saleParticipantFirstName,
  this.blastname=this.responsedata1.saleParticipantLastName

});

var data2 = {
  type: "Seller",
  id: "100000002",
  user: "admin"
} 

let headers2 = new Headers({
'Content-Type': 'application/json'
});
let options2 = new RequestOptions({
headers: headers2
});
let body2 = JSON.stringify(data2); 

console.log(body2);

this.http.post('https://hmlr-ds-transactionapi.eu-gb.mybluemix.net/api/get/participant', body2, options2).subscribe(res => {

this.responsedata2= res.json();
console.log(this.responsedata2);
console.log(this.responsedata2.saleParticipantFirstName);
console.log(this.responsedata2.saleParticipantLastName);

this.sfirstname=this.responsedata2.saleParticipantFirstName,
this.slastname=this.responsedata2.saleParticipantLastName

});

    // var sellerRequest = JSON.stringify({
    //   type: "Seller",
    //   id: "100000002",
    //   user: "admin"
    // });

    // const getUser = (user) => fetch('https://hmlr-ds-instantmortgageui.eu-gb.mybluemix.net/api/get/participant', {
    //   method: 'POST',
    //   mode: 'cors',
    //   body: user,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // }).then(res => res.json());

    // Promise.all([getUser(sellerRequest), getUser(buyerRequest)]).then(result => {
    //   const seller = result[0];
    //   const buyer = result[1];

    //   this.seller = {
    //     id: seller.saleParticipantId,
    //     title: seller.title,
    //     firstName: seller.saleParticipantFirstName,
    //     lastName: seller.saleParticipantLastName
    //   }

    //   this.buyer = {
    //     id: buyer.saleParticipantId,
    //     title: buyer.title,
    //     firstName: buyer.saleParticipantFirstName,
    //     lastName: buyer.saleParticipantLastName
    //   }
    // })

  }
  opennewtab()
  {
    var strWindowFeatures = "resizable=yes,scrollbars=yes";
    // window.open('http://localhost:4200/#/linedetail','newwindow',strWindowFeatures)
    window.open("http://hmlr-ds-landingscreen.eu-gb.mybluemix.net/#/BCViewer",'newwindow',strWindowFeatures)
  }
  reset(){
    var data = {}

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(data);

    console.log("body",body);

    this.http.post("https://hmlr-ds-transactionapi.eu-gb.mybluemix.net/api/resetdemo",body,options).subscribe(res=>{
      this.responsedata= res.json();
      console.log("responsedata",this.responsedata);
      var data1= JSON.stringify(this.responsedata);
      this.cont="https://hmlr-ds-transactionui.eu-gb.mybluemix.net/#/contract/100000002/100000008/" + data1;
      console.log("url",this.cont);
      localStorage.setItem("data2",data1);
      alert("Demo reset")
    });
  }

  updateregistry(){
    var data ={
      propertyExchangeId: "propertyExchange".concat(this.data2),
     // user: "100000008"
     user: "hmlr"
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(data);

    console.log("body",body);


    this.http.post("https://hmlr-ds-transactionapi.eu-gb.mybluemix.net/api/property/transfer",body,options).subscribe(res=>{

      this.changestatus();
    });
      
  }
  changestatus(){
    var data ={
      propertyExchangeId:"propertyExchange".concat(this.data2),
      propertyExchangeStatus:"REGISTRY_UPDATED",
      user:"admin"
     }
     let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(data);

    console.log("body",body);

    this.http.post("https://hmlr-ds-transactionapi.eu-gb.mybluemix.net/api/propertyExchange/updateStatus",body,options).subscribe(res=>{
      alert("Registry Updated");
      window.location.reload();
    });
    
  }
  movein(){
    var data ={
      propertyExchangeId:"propertyExchange".concat(this.data2),
      propertyExchangeStatus:"BUYER_MOVES_IN",
      user:"admin"
     }
     let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(data);

    console.log("body",body);

    this.http.post("https://hmlr-ds-transactionapi.eu-gb.mybluemix.net/api/propertyExchange/updateStatus",body,options).subscribe(res=>{
      alert("Buyer Moves In");
      window.location.reload();
    });
  }
  div_hide(){
    document.getElementById('abc').style.display = "none";
    }
    div_show() {
      console.log("index value in popo up")
      
    document.getElementById('abc').style.display = "block";
    }
}
