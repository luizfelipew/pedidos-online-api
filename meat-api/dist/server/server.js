"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                //configurando o query parser para obter os parametros da query
                this.application.use(restify.plugins.queryParser());
                //routes
                for (let rourter of routers) {
                    rourter.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    //console.log('API is running on http://localhost:3000');    
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then((() => this.initRoutes(routers).then(() => this)));
    }
}
exports.Server = Server;
