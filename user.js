const fs = require('fs')
const {findUser,extractUser, createUser}  = require('./authentication.js') 

function returnOnlineuser(){
    const data = extractUser()
        const users = []
        data.forEach(element => {
            if(element.online){
                users.push(element)
            }
        });
        return users;
}

function turnOffline(data){
    const users = extractUser()
    
    users.forEach(element=>{
        
        if(element.username == data.username){
            console.log('matched')     
            element.online = !(element.online)
        }
    })
    
        fs.writeFileSync('./src/users.json',JSON.stringify(users))
    }
    






module.exports = {
    returnOnlineuser,
    turnOffline,

}