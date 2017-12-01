import { Routes } from '@angular/router'; 
import { LandingpgComponent } from './landingpg/landingpg.component';
import { BcviewerComponent } from './bcviewer/bcviewer.component';
import { MainlandingComponent } from './mainlanding/mainlanding.component';
import { LandingimComponent } from './landingim/landingim.component';

export const AppRoutes:Routes = [ 
    {  
        path : '',
        component :MainlandingComponent
    },
    {  
        path : 'Landing',
        component :LandingpgComponent
    },
    {  
        path : 'BCViewer',
        component :BcviewerComponent
    },
    {  
        path : 'LandingIM',
        component :LandingimComponent
    }
   
];