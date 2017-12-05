import { Component, OnInit } from '@angular/core';
import { Http,Response,HttpModule, Headers,RequestOptions} from '@angular/http';
import {Router } from '@angular/router';
import {FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landingim',
  templateUrl: './landingim.component.html',
  styleUrls: ['./landingim.component.css']
})
export class LandingimComponent implements OnInit {
  success='f';responsedata;firstname;lastname;
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    var data = {
      type: "Buyer",
      id: "100000008",
      user: "admin"
  } 

  let headers = new Headers({
    'Content-Type': 'application/json'
});
let options = new RequestOptions({
    headers: headers
});
let body = JSON.stringify(data); 

console.log(body);

this.http.post('https://hmlr-ds-transactionapi.eu-gb.mybluemix.net/api/get/participant', body, options).subscribe(res => {
  
 this.responsedata= res.json();
 console.log(this.responsedata);
 console.log(this.responsedata.saleParticipantFirstName);
 console.log(this.responsedata.saleParticipantLastName);
 
   this.firstname=this.responsedata.saleParticipantFirstName,
  this.lastname=this.responsedata.saleParticipantLastName

});
  }

  next(){
    this.success='t';
    }
    // nexteve(){
    //   this.router.navigate('http://localhost:8100');
    // }
}
