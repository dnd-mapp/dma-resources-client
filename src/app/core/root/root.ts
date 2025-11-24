import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'dma-root',
    templateUrl: './root.html',
    styleUrl: './root.scss',
    imports: [RouterOutlet],
})
export class Root {}
