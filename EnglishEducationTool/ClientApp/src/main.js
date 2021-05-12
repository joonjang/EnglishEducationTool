"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseUrl = void 0;
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
var environment_1 = require("./environments/environment");
function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
exports.getBaseUrl = getBaseUrl;
var providers = [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
document.addEventListener('DOMContentLoaded', function () {
    platform_browser_dynamic_1.platformBrowserDynamic(providers).bootstrapModule(app_module_1.AppModule)
        .catch(function (err) { return console.error(err); });
});
//import { enableProdMode } from '@angular/core';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AppModule } from './app/app.module';
//import { environment } from './environments/environment';
//export function getBaseUrl() {
//  return document.getElementsByTagName('base')[0].href;
//}
//const providers = [
//  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
//];
//if (environment.production) {
//  enableProdMode();
//}
//platformBrowserDynamic(providers).bootstrapModule(AppModule)
//  .catch(err => console.log(err));
//export { renderModule, renderModuleFactory } from '@angular/platform-server';
//# sourceMappingURL=main.js.map