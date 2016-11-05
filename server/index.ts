/// <reference path="../typings/index.d.ts" />
import * as express		from 'express';

console.log('CORE: Starting Server');
const app = express();

app.get('*', express.static(__dirname+'/../app'));

app.listen( process.env.PORT || 3000, function () {
  console.log('CORE: Server running on Port '+ (process.env.PORT || 3000) );
});