import { resolve } from "dns";

const users = [
    {id: '1', name: 'Peter Parker', email: 'peter@marvel.com'},
    {id: '2', name: 'Homem Aranha', email: 'aranha@marvel.com'}
]

export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }

    static finrById(id: string): Promise<any>{
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id === id)
            let user = undefined
            if(filtered.length > 0){
                user = filtered[0]
            }

            resolve(user)
        })
    }
}