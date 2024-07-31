import { Component, OnInit } from "@angular/core";
import { InMemoryDataService } from "../in-memory-data.service";

@Component({
    selector: 'app-quote-count',
    templateUrl: './quoteCount.component.html',
    styleUrls: ['./quoteCount.component.css'],
})

export class QuoteCountComponent implements OnInit {
    topLinesOfBusiness: any[] = [];

    constructor(private dataService: InMemoryDataService) {}

    ngOnInit() {
        this.topLinesOfBusiness = this.dataService.getQuoteCount().slice(0, 2)
    }
}