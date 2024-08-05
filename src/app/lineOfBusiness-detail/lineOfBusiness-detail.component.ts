import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: [ './lineOfBusiness-detail.component.css' ]
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  quoteCount: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private location: Location,
    private inMemoryDataService: InMemoryDataService
  ) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
  }

  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineOfBusiness => {
        this.lineOfBusiness = lineOfBusiness;
        this.getQuoteCount(lineOfBusiness.id);
      });
  }

  getQuoteCount(lineOfBusinessId: number): void {
    const quotes = this.inMemoryDataService.createDb().recentQuotes;
    this.quoteCount = quotes.filter(quote => quote.lineOfBusiness === lineOfBusinessId).length
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService.updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
