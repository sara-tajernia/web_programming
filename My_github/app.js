function not_found(){
    document.getElementById('not-found').style.display='none'
}

function server_error(){
    document.getElementById('server-error').style.display='none'
}

function local_storage1(){
    console.log('sara')
    document.getElementById('local-storage').style.display='none'
}

async function getinfo(e) {
    e.preventDefault();
    var request = new XMLHttpRequest()    
    var request_repos = new XMLHttpRequest()
    var request_repo0 = new XMLHttpRequest()
    var request_repo1 = new XMLHttpRequest()
    var request_repo2 = new XMLHttpRequest()
    var request_repo3 = new XMLHttpRequest()
    var request_repo4 = new XMLHttpRequest()
    url = 'https://api.github.com/users/'
    const username = document.getElementById("user-id").value
    // if (username in localStorage) {
    //     var data = localStorage.getItem(document.getElementById("user-id").value)
    //     data=JSON.parse(data)
    //     console.log(data)
    //     document.getElementById("avatar-url").src = data.avatar_url
    //     document.getElementById("name").innerHTML = data.name
    //     document.getElementById("blog").setAttribute('href', data.blog)
    //     document.getElementById("location").innerHTML = data.location
    //     document.getElementById("bio").innerHTML = data.bio
    //     document.getElementById("location").innerHTML = data.location
    //     url_repo = data.repos_url+'?per_page=5&sort=pushed'
    //     request_repo.open('GET', repos_url, true)
    //     request_repo.onload = function () {
    //         var data_repo = JSON.parse(this.response)
    //         console.log(data_repo)
    //     }
        
    //     server_error = document.getElementById('local-storage').style.display='block'
    // }else{

        request.open('GET', url + document.getElementById("user-id").value, true)
        // console.log(1, request)
        request.onload = function () {
        var data = JSON.parse(this.response)
            if (request.status >= 200 && request.status < 400) {
                // console.log('success', data)
                document.getElementById("avatar-url").src = data.avatar_url
                document.getElementById("name").innerHTML = data.name
                document.getElementById("blog").setAttribute('href', data.blog)
                document.getElementById("location").innerHTML = data.location
                document.getElementById("bio").innerHTML = data.bio
                localStorage.setItem(document.getElementById("user-id").value, this.response);
                url_repo = data.repos_url+'?per_page=5&sort=pushed'
                request_repos.open('GET', data.repos_url+'?per_page=5&sort=pushed', true)
                // console.log(request_repo)
                var languages = {};
                request_repos.onload = function () {
                    console.log(123)
                    var data_repo = JSON.parse(this.response)
                    console.log(data_repo)
                    request_repo0.open('GET', data_repo[0].languages_url, true)
                    request_repo0.onload = function () {
                        var data_repo0 = JSON.parse(this.response)
                        languages = find_favorite_language(languages, Object.keys(data_repo0), Object.values(data_repo0))
                        // console.log(languages)

                    }
                    request_repo0.send()
                    request_repo1.open('GET', data_repo[1].languages_url, true)
                    request_repo1.onload = function () {
                        var data_repo1 = JSON.parse(this.response)
                        languages = find_favorite_language(languages, Object.keys(data_repo1), Object.values(data_repo1))
                        
                    }
                    request_repo1.send()
                    request_repo2.open('GET', data_repo[2].languages_url, true)
                    request_repo2.onload = function () {
                        var data_repo2 = JSON.parse(this.response)
                        languages = find_favorite_language(languages, Object.keys(data_repo2), Object.values(data_repo2))
                    }
                    request_repo2.send()
                    request_repo3.open('GET', data_repo[3].languages_url, true)
                    request_repo3.onload = function () {
                        var data_repo3 = JSON.parse(this.response)
                        languages = find_favorite_language(languages, Object.keys(data_repo3), Object.values(data_repo3))
                    }
                    request_repo3.send()
                    request_repo4.open('GET', data_repo[4].languages_url, true)
                    request_repo4.onload = function () {
                        var data_repo4 = JSON.parse(this.response)
                        languages = find_favorite_language(languages, Object.keys(data_repo4), Object.values(data_repo4))
                    }
                    request_repo4.send()
                    
                    console.log(data_repo[0].languages_url)
                    console.log(data_repo[1].languages_url)
                    console.log(data_repo[2].languages_url)
                    console.log(data_repo[3].languages_url)
                    console.log(data_repo[4].languages_url)

                    console.log(languages)
                    value1 = getVal(languages)
                    console.log(value1)
                    // console.log(Object.values(languages).length)

                    // console.log(languages.arguments)
                    // console.log(Object.getOwnPropertyNames(languages))
                    // // console.log(Object.keys(languages))
                    // //find max value in object
                    // var max = 0
                    // keys = await Object.keys(languages)
                    // // values = Object.values(languages)
                    // console.log(Object.keys(languages), Object.values(languages))
                    // for (var i = 0; i < length(keys); i++) {
                    //     console.log(keys[i], values[i])
                    //     if (values[i] > max) {
                    //         max = values[i]
                    //     }
                    // }
                    // console.log(max)



                    // console.log(Object.keys(languages).reduce(function(a, b){ return languages[a] > languages[b] ? a : b }))
                    // console.log(Object.keys(languages))
                    // console.log(Object.values(languages))

                }
                request_repos.send()
            }

            else {
                console.log('error')
                not_found = document.getElementById('not-found').style.display='block'
                document.getElementById("avatar-url").src = "assets/profile.jpg"
                document.getElementById("name").innerHTML = "Name"
                document.getElementById("blog").innerHTML = "Address link"
                document.getElementById("location").innerHTML = "Country/City"
                document.getElementById("bio").innerHTML = "Bio"
                // close = document.getElementById('signup').style.display='none'
            }
        }
        request.onerror= function(e) {
            server_error = document.getElementById('server-error').style.display='block'
        };
        request.send()
    // }
}

function find_favorite_language(languages, keys, values){
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] in languages) {
            languages[keys[i]] += values[i]
        }
        else {
            languages[keys[i]] = values[i]
        }
    }
    return languages
}

async function getVal(languages){
    return await Object.keys(languages)
}

document.getElementById('submit-btn').addEventListener('submit', getinfo)
document.getElementById('not-found').addEventListener('click', not_found)
document.getElementById('server-error').addEventListener('click', server_error)
document.getElementById('local-storage-btn').addEventListener('click', local_storage1)

// GIT_REPO="https://api.github.com/repos/kubernetes/kubernetes" # Input Git Repo
// BRANCH_NAME="master"                                          # Input Branch Name
// COMMITS_NUM="5"                                               # Input to get last "N" number of commits

// curl --silent --insecure --request GET --header "Accept: application/vnd.github.inertia-preview+json" "$GIT_REPO/commits?sha=$BRANCH_NAME&page=1&per_page=1000" | jq --raw-output '.[] | "\(.sha)|\(.commit.author.date)|\(.commit.message)|\(.commit.author.name)|\(.commit.author.email)" | gsub("[\n\t]"; "")' | awk 'NF' | awk '{$1=$1;print}' | head -$COMMITS_NUM