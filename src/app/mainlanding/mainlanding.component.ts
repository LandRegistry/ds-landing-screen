import { Component, OnInit } from '@angular/core';
import { Http,Response,HttpModule, Headers,RequestOptions} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mainlanding',
  templateUrl: './mainlanding.component.html',
  styleUrls: ['./mainlanding.component.css']
})
export class MainlandingComponent implements OnInit {
responsedata;cont;backgroundImg;
object = {
  link: "\assets\JM-bg.PNG"
}
  constructor(public http: Http, private router: Router,private route: ActivatedRoute,private sanitizer: DomSanitizer) { 
   
  }

  ngOnInit() {
    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(\assets\JM-bg.PNG)');
  }
  opennewtab()
  {
    var strWindowFeatures = "resizable=yes,scrollbars=yes";
    // window.open('http://localhost:4200/#/linedetail','newwindow',strWindowFeatures)
    window.open(environment.paulPropertyAdvisorUI,'newwindow',strWindowFeatures)
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

    this.http.post(environment.transactionAPI + "/api/resetdemo",body,options).subscribe(res=>{
      this.responsedata= res.json();
      console.log("responsedata",this.responsedata);
      var data1= JSON.stringify(this.responsedata);
      this.cont=environment.transactionUI + "/#/contract/100000002/100000008/" + data1;
      console.log("url",this.cont);
      localStorage.setItem("data2",data1);
      alert("Demo reset")
    });
  }

}
