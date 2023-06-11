const fs  = require('fs');


function extractUser(){
    
    const data =  JSON.parse(fs.readFileSync('./src/users.json','utf8'))
    return data;
}


 function createUser(data){
    const {username, passwd, online} = data
    const newUser = {
        username,
        passwd,
        online
    }
    try{
        const userData = extractUser()
        
        if(checkUsernameUniqueness(data,userData)){
            userData.push(newUser)
            fs.writeFileSync('./src/users.json',JSON.stringify(userData))
        }
        
        else{
            return false; 
        }
        
    }catch(err){
        return err
    }
    
    return newUser;
}

function findUser(key,value1){
    const dataset = extractUser()
    let value = null

    dataset.forEach((item,index)=>{
        if(item[key] === value1){
            value = {item,index}
        }
    })
    
    return value;
}

function checkLoginDetails(data){
   
    const value = findUser('username',data.username)
    if(value !== null){
        
        if(value['item'].passwd === data.passwd){
            
            return 1
        }
        return 2
    }
    return 0
}

function checkUsernameUniqueness(data,items){
    let flag = true;
    
    items.forEach(element => {
        if(element.username.trim() === data.username.trim()){
            flag = false
        }
    });
    return flag;
}







module.exports = {
    createUser,
    extractUser,
    checkLoginDetails,
    findUser
}