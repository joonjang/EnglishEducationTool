//import 'zone.js/dist/zone-node';

//import { ngexpressengine } from '@nguniversal/express-engine';
//import * as express from 'express';
//import { join } from 'path';

//import { appservermodule } from './src/main.server';
//import { app_base_href } from '@angular/common';
//import { existssync } from 'fs';

//// the express app is exported so that it can be used by serverless functions.
//export function app(): express.express {
//  const server = express();
//  const distfolder = join(process.cwd(), 'dist/englisheducationtool/browser');
//  const indexhtml = existssync(join(distfolder, 'index.original.html')) ? 'index.original.html' : 'index';

//  // our universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
//  server.engine('html', ngexpressengine({
//    bootstrap: appservermodule,
//  }));

//  server.set('view engine', 'html');
//  server.set('views', distfolder);

//  // example express rest api endpoints
//  // server.get('/api/**', (req, res) => { });
//  // serve static files from /browser
//  server.get('*.*', express.static(distfolder, {
//    maxage: '1y'
//  }));

//  // all regular routes use the universal engine
//  server.get('*', (req, res) => {
//    res.render(indexhtml, { req, providers: [{ provide: app_base_href, usevalue: req.baseurl }] });
//  });

//  return server;
//}

//function run(): void {
//  const port = process.env.port || 4000;

//  // start up the node server
//  const server = app();
//  server.listen(port, () => {
//    console.log(`node express server listening on http://localhost:${port}`);
//  });
//}

//// webpack will replace 'require' with '__webpack_require__'
//// '__non_webpack_require__' is a proxy to node 'require'
//// the below code is to ensure that the server is run only when not requiring the bundle.
//declare const __non_webpack_require__: noderequire;
//const mainmodule = __non_webpack_require__.main;
//const modulefilename = mainmodule && mainmodule.filename || '';
//if (modulefilename === __filename || modulefilename.includes('iisnode')) {
//  run();
//}

//export * from './src/main.server';
