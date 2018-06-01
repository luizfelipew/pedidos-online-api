import * as restify from 'restify'
import {environment} from '../common/environment'
import {Router} from '../common/router'

export class Server {
    

    application: restify.Server

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })
                //configurando o query parser para obter os parametros da query
                this.application.use(restify.plugins.queryParser())

                //routes
                for(let rourter of routers){
                    rourter.applyRoutes(this.application)
                }
                

                this.application.listen(environment.server.port, () => {
                    //console.log('API is running on http://localhost:3000');    
                    resolve(this.application)
                })

            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initRoutes(routers).then(()=> this)
    }

}