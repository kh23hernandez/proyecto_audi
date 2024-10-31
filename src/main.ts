import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Asegúrate de que la ruta sea correcta

bootstrapApplication(AppComponent, {
    providers: [
        HttpClientModule,
        provideRouter(routes)
    ]
}).catch(err => console.error(err));
