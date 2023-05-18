import { getKey, getUserFromCookie, register } from "./api.js"

$(function() {
    $(document).keydown(function (e) { 
        var correu =  $("#inputCorreu").val()

        if (correu.includes("@")){
            $("#inputCorreu").css("box-shadow", "0px 0px 22px 5px rgba(16,201,59,1)");
        }

        else{
            $("#inputCorreu").css("box-shadow", "0px 0px 0px 0px rgba(16,201,59,1)");
        }
    })

    $("#iniciarSesioButton").hover(function () {
        $("#crearCompteRedirect").css("animation","shake 0.5s");
        $("#crearCompteRedirect").css("animation-iteration-count","3");
    })

    $("#crearButton").hover(function () {
        $("#iniciarSesioRedirect").css("animation","shake 0.5s");
        $("#iniciarSesioRedirect").css("animation-iteration-count","3");
    })
    
    $('#crearCompteRedirect').click(function(){
        window.location.href='/pages/crear-sesion.html';
     })

     $('#iniciarSesioRedirect').click(function(){
        window.location.href='/pages/iniciar-sesion.html';
     })

     $("#inputContraRepit").keydown(function (e) { 
        if ($("#inputContra").val()===$("#inputContraRepit").val()){
            $("#inputContra").css("box-shadow", "0px 0px 22px 9px rgba(16,201,59,1)");
            $("#inputContraRepit").css("box-shadow", "0px 0px 22px 9px rgba(16,201,59,1)");  
        }
    })

    $("#iniciarSesioButton").click(async function() {
        var correu =  $("#inputCorreu").val()
        var password = $("#inputContra").val()
    
        const key = await getKey(correu, password)
        document.cookie = "key=" + key.key
        document.cookie = "baseId=" + key.baseId

        const user = await getUserFromCookie()
        console.log(user)
        document.location.href = "http://192.168.5.4:5500/pages/control-panel.html"
    })

    $("#crearButton").click(async function() {
        var correu = $("#inputCorreu").val()
        var name = $("#inputName").val()
        var lastName = $("#inputLastName").val()
        var password = $("#inputContra").val()
        
    
        const key = await register(correu, password, name, lastName)
        document.cookie = "key=" + key.key
        document.cookie = "baseId=" + key.baseId

        const user = await getUserFromCookie()
        console.log(user)
        document.location.href = "http://192.168.5.4:5500/pages/control-panel.html"
    })

    $('#logoHeader').click(function(){
        window.location.href='/index.html';
     })
})



