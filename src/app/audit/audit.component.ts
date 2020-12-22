import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AuditService, AuthenticationService } from '@/_services';

import { Audit } from '../_models/audit';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    audits= [] ;
    page: number = 1;
    user : any;
    
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    )
    {
    }
    

    ngOnInit()
    {
        this.loadAllAudits();
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => this.audits = audits);
    }
    Search() {
        if (this.user== "") {
            this.ngOnInit();
        }else {
            this.audits = this.user.audits(res => {
                return res.user.toLocaleLowerCase().match(this.user.toLocaleLowerCase)
            })
        }
    }
    key: string="id";
    reverse: boolean= false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
}