function not_found(){
    document.getElementById('not_found').style.display='none'
}

function server_error(){
    document.getElementById('server_error').style.display='none'
}

function local_storage1(){
    console.log('sara')
    document.getElementById('local_storage').style.display='none'
}

async function getinfo(e) {
    e.preventDefault();
    var request = new XMLHttpRequest()    
    url = 'https://api.github.com/users/'
    // console.log(url + document.getElementById("user-id").value)
    // console.log('hiii', localStorage.getItem(document.getElementById("user-id").value))
    const username = document.getElementById("user-id").value
    if (username in localStorage) {
        var data = localStorage.getItem(document.getElementById("user-id").value)
        data=JSON.parse(data)
        console.log(data.avatar_url)
        console.log('successhjhhj', data)
        document.getElementById("avatar_url").src = data.avatar_url
        document.getElementById("name").innerHTML = data.name
        document.getElementById("blog").setAttribute('href', data.blog)
        document.getElementById("location").innerHTML = data.location
        document.getElementById("bio").innerHTML = data.bio
        document.getElementById("location").innerHTML = data.location
        server_error = document.getElementById('local_storage').style.display='block'
    }else{
        request.open('GET', url + document.getElementById("user-id").value, true)
        request.onload = function () {
        var data = JSON.parse(this.response)
            if (request.status >= 200 && request.status < 400) {
                console.log('success', data)
                document.getElementById("avatar_url").src = data.avatar_url
                document.getElementById("name").innerHTML = data.name
                document.getElementById("blog").setAttribute('href', data.blog)
                document.getElementById("location").innerHTML = data.location
                document.getElementById("bio").innerHTML = data.bio
                document.getElementById("location").innerHTML = data.location
                localStorage.setItem(document.getElementById("user-id").value, this.response);
            }

            else {
                console.log('error')
                not_found = document.getElementById('not_found').style.display='block'
                // close = document.getElementById('signup').style.display='none'
            }
        }
        request.onerror= function(e) {
            server_error = document.getElementById('server_error').style.display='block'
        };
        request.send()
    }
    // document.getElementById("avatar_url").src = data.avatar_url
    // document.getElementById("name").innerHTML = data.name
    // document.getElementById("blog").setAttribute('href', data.blog)
    // document.getElementById("location").innerHTML = data.location
    // document.getElementById("bio").innerHTML = data.bio
    // document.getElementById("location").innerHTML = data.location
    
}

// function(event){
//     if(event.keyCode == 13){
//         document.getElementById("myBtn").click();
//     }
// }

document.getElementById('submit_btn').addEventListener('submit', getinfo)
// document.getElementById('submit').addEventListener('submit_btn', getinfo)
document.getElementById('not_found').addEventListener('click', not_found)
document.getElementById('server_error').addEventListener('click', server_error)
document.getElementById('local_storage_btn').addEventListener('click', local_storage1)

// window.onload = function () {
//     localStorage.clear();
// }



// document.getElementById('signup').style.display='none'
