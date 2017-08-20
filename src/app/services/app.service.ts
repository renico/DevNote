import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AppData {

    public static CREATE    = 'CREATE';
    public static READ      = 'READ';
    public static UPDATE    = 'UPDATE';
    public static DELETE    = 'DELETE';
    
    private static appData:AppData;

    constructor(){
        AppData.getInstance();
    }

    static getInstance(){
        if(!AppData.appData){
            return AppData.appData = new AppData();
        }
    }


}