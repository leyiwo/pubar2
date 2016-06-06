/**
 * Created by wj on 2016/6/6.
 * happy everyday!
 *
 * TOKEN = md5(模块+时间戳+用户ID+登录返回的token)
 */
'use strict'
import md5 from 'md5'


export default class Token {
    // 用户名默认为0
    constructor(){
        this._userId = 0
        this._token = ''
    }

    get timeStamp(){
        // 转化成10位数的时间戳
        return parseInt(new Date().getTime() / 1000)
    }

    tokenString(module){
        if(module !== 'Meb' && this._userId === 0) throw new Error('未登陆时要获取登录token')

        let timeStamp = this.timeStamp
        let str = module + this._userId + timeStamp + this.loginToken
        let token = md5(str.trim())
        if(!this.loginToken){
            console.log(`set loginToken [${token}]`);
            this.loginToken = token
        }
        console.info(`get token from
            module: ${module},
            userId: ${this._userId},
            timeStamp : ${timeStamp},
            loginToken: ${this.loginToken}
            [get token ${token} from time ${timeStamp}]`);
        return { token,timeStamp }
    }

    // setter and getter for loginToken
    // 也许要从localStorage 里面取值
    set loginToken(t){
        this._token = t
    }

    get loginToken(){
        return this._token
    }

    set userId(id){
        this._userId = id
    }

    get userId(){
        return this._userId
    }

    getToken(module = 'Meb'){
        if(this._check(module)) this._reset()
        return this.tokenString(module)
    }

    _check(module){
        //处理 module : Meb , _userId 存在  loginToken存在时 return true  也就是需要重新登陆和注册时
        return module === 'Meb' && this._userId !== 0 && !!this.loginToken
    }

    /**
     * 重置_userId和loginToken
     */
    _reset(){
        this._userId = 0
        this.loginToken = ''
    }

}
