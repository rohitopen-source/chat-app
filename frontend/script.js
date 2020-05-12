let socket =io()
socket.on('connected',()=>{
    console.log("connected at "+ socket.id)
})
$(function(){
    let msglist = $('#msglist')
    let send = $('#send')
    let msgbox = $('#msgbox')
    let loginbtn =$('#loginbtn')
    let chatdiv = $('#chat-div')
    let logindiv = $('#login-div')
    let loginbox=$('#loginbox')

    let user = ' '
    send.click(function (){
        socket.emit('send_msg',{
            user : user,
            message:msgbox.val()
        })
    })

    loginbtn.click(function(){
        user = loginbox.val()
        chatdiv.show()
        logindiv.hide()
        socket.emit('login',{
            user : user
        })
    })

    socket.on('rec_msg',function(data){
        msglist.append($('<li>' + data.user + ':' + data.message + '</li>'))
    })
})