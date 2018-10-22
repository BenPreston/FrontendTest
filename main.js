var data;

//let pickUser = "benpreston";
//
//callUser(pickUser);

function findUser() {

    let name = document.getElementById("username").value;
    let gitHubLink = "https://api.github.com/users/" + name;

    fetch(("https://api.github.com/users/" + name), {

        method: "GET"

    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);

    }).then(function (json) {

        data = json;
        document.getElementById("noUserExists").classList.add("hidden");
        document.getElementById("gitUserDiv").classList.remove("hidden");
        document.getElementById("repoTableDiv").classList.add("hidden");

        document.getElementById("gitHubPicture").innerHTML = "<img class=\"gitPic\" src=" + data.avatar_url + ">";

        document.getElementById("gitHubUsername").innerHTML = data.login;

        document.getElementById("gitHubName").innerHTML = data.name;

        if (data.bio == null) {
            document.getElementById("gitHubBio").innerHTML = "This user has no bio!"
        } else {
            document.getElementById("gitHubBio").innerHTML = data.bio;
        }

        if (data.public_repos > 0) {

            showRepos();

        }


    }).catch(function (error) {
        //called when there's an error
        console.log("Request failed " + error.message);

        document.getElementById("noUserExists").classList.remove("hidden");
        document.getElementById("gitUserDiv").classList.add("hidden");

        document.getElementById("repoTableDiv").classList.add("hidden");


    });
}

function showRepos() {

     document.getElementById("repoTableDiv").classList.remove("hidden");
    
    var repoTable = document.getElementById("repositoryInfo");

    let name = document.getElementById("username").value;

    fetch(("https://api.github.com/users/" + name + "/repos"), {

        method: "GET"

    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);

    }).then(function (json) {

        repoData = json;

        for (i = 0; i < repoData.length; i++) {

            var tableRows = document.createElement("tr");
            var repoName = document.createElement("td");
            var repoForks = document.createElement("td");
            var repoStars = document.createElement("td");

            repoTable.appendChild(tableRows);
            tableRows.appendChild(repoName);
            tableRows.appendChild(repoForks);
            tableRows.appendChild(repoStars);

            repoName.innerHTML = repoData[i].name;
            repoStars.innerHTML = "<img class=\"gitIcons\" src=\"gitHubForkIcon.png\">" + " " + repoData[i].stargazers_count;
                
                repoForks.innerHTML = "<img class=\"gitIcons\" src=\"star.png\">" + " " + repoData[i].forks_count;
          }

    }).catch(function (error) {
        //called when there's an error
        console.log("Request failed " + error.message);

    });

}
