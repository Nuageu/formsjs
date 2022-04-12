var icons = document.querySelectorAll("i.icon-password")
var formRegister = document.forms['register']
var formLogin = document.forms['login']
var firstname = document.forms[0]['firstname']
var lastname = document.forms[0]['lastname']
var email  = document.forms[0]['email']
var password  = document.forms[0]['password']
var passwordConfirm  = document.forms[0]['passwordConfirm']
var check ={}

var listenerFunction ={
    toggleInputType:(ev) =>{
        ev.target.classList.toggle("fa-eye-slash")
        var input = ev.target.parentNode.children[0];
        if(input.type == "password"){
            input.type = "text"
        }else{
            input.type = "password"
        }
    },
    checkFirstName: (ev) =>{
        var input = ev.target;
        var content = input.value.trim()
        var error = ''
        document.getElementById('error-firstname').innerHTML = error
        if(!content){
            error = 'Your first name must not be empty'
        }else if(!/^[a-zA-Z]{2,15}$/.test(content)){
            error = 'Your first name is not valid !'
        }
        if(error){
            check = {...check, firstname: false}
            document.getElementById('error-firstname').innerHTML = error
        }else{
            check = {...check, firstname: true}
        }
        setSubmitButton()
    },
    checkLastName: (ev) =>{
        var input = ev.target;
        var content = input.value.trim()
        var error = ''
        document.getElementById('error-lastname').innerHTML = error
        if(!content){
            error = 'Your last name must not be empty'
        }else if(!/^[a-zA-Z]{2,15}$/.test(content)){
            error = 'Your last name is not valid !'
        }
        if(error){
            check = {...check, lastname: false}
            document.getElementById('error-lastname').innerHTML = error
        }else{
            check = {...check, lastname: true}
        }
        setSubmitButton()
    },
    checkEmail: (ev) =>{
        var input = ev.target;
        var content = input.value.trim()
        var error = ''
        document.getElementById('error-email').innerHTML = error
        if(!content){
            error = 'Your email must not be empty'
        }else if(!/^[a-z0-9.-_]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(content)){
            error = 'Your email is not valid !'
        }
        if(error){
            check = {...check, email: false}
            document.getElementById('error-email').innerHTML = error
        }else{
            check = {...check, email: true}
        }
        setSubmitButton()
    },
    checkPassword: (ev) =>{
        var input = ev.target;
        var content = input.value.trim()
        var error = ''
        var regPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*&?])[A-Za-z\d@$!%*?&]{8,20}$/
        document.getElementById('error-password').innerHTML = error
        if(!content){
            error = 'Your password must not be empty'
        }else if(!regPassword.test(content)){
            error = 'Your password must contain at least one upper case letter,one lower case, one number and one special character and be between 8 and 20 characters long.'
        }
        if(error){
            check = {...check, password: false}
            document.getElementById('error-password').innerHTML = error
        }else{
            check = {...check, password: true}
        }
        setSubmitButton()
    },
    checkPasswordConfirm: (ev) =>{
        var input = ev.target;
        var content = input.value.trim()
        var error = ''
        document.getElementById('error-confirm-password').innerHTML = error
        if(!content){
            error = 'Your confirm password must not be empty'
        }else if(content !== password.value){
            error = 'Confirmation password does not match entered password'
        }
        if(error){
            check = {...check, passwordConfirm: false}
            document.getElementById('error-confirm-password').innerHTML = error
        }else{
            check = {...check, passwordConfirm: true}
        }
        setSubmitButton()
    },
    submitLoginForm:(ev) => {
        ev.preventDefault()
        var formData = new FormData(fromLogin)
        // Requête vers le serveur
    }
}

var checkFormValidity = () =>{
    var result = true
    if(formRegister){
        if(Object.keys(check).length === 5){
            for (const key in check){
                    const value = check[key];
                    result = result && value
                    if(!result) return result
                }
                return result
            }
        }
        return false;
    }
    
var setSubmitButton = () => {
    if(formRegister){
        if(checkFormValidity()){
            if(formRegister.elements[5]){
                formRegister.elements[5].disabled = false
                return;
            }
        }
        formRegister.elements[5].disabled = true
    }
}

// var toggleInputType = (ev) =>{
//     ev.target.classList.toggle("fa-eye-slash")
//     var input = ev.target.parentNode.children[0];
//     if(input.type == "password"){
//         input.type = "text"
//     }else{
//         input.type = "password"
//     }
// }

var setupListeners = () =>{

    // firstname ? firstname.onkeyup = listenerFunction.checkFirstName : null  // peux remplacer les trois ligne du dessous
    if(firstname){
        firstname.onkeyup = listenerFunction.checkFirstName
    }
    // lastname ? lastname.onkeyup = listenerFunction.checkFirstName : null  // peux remplacer les trois ligne du dessous
    if(lastname){
        lastname.onkeyup = listenerFunction.checkLastName
    }
    email ? email.onkeyup = listenerFunction.checkEmail : null
    password ? password.onkeyup = listenerFunction.checkPassword : null
    passwordConfirm ? passwordConfirm.onkeyup = listenerFunction.checkPasswordConfirm : null
    formLogin ? formLogin.onsubmit = listenerFunction.submitLoginForm : null
    for (let index = 0; index < icons.length; index++) {
        const icon = icons[index];
        icon.onclick = listenerFunction.toggleInputType
    }
}