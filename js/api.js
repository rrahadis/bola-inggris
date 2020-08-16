var base_url = "https://api.football-data.org/v2/teams/";
var league_url = "https://api.football-data.org/v2/competitions/2021/standings";


// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getTeam() {
  if ('caches' in window) {
    caches.match(base_url).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var teamHTML = "";
          data.teams.forEach(function(teams) {
            teamHTML += `
              <div class="card">
                <a href="./detail.html?id=${teams.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${teams.crestUrl}" onerror="this.onerror=null;this.src='img/bola.png';">
                 </div>
                </a>
                <div class="card-content">
                 <span class="card-title truncate">${teams.name}</span>
                 <p>${teams.address}</p>
                </div>
                <div class ="card-action">
                  <a href="${teams.website}">Lihat Website</a>
                </div>
              </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamHTML;
          
        })
      }
    })
  }


  fetch(base_url, {
         headers: {
           'X-Auth-Token': '1fa14f02766a4927899b2392388f6bf4',
         },
       })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var teamHTML = "";
      data.teams.forEach(function(teams) {
        teamHTML += `
              <div class="card">
                <a href="./detail.html?id=${teams.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${teams.crestUrl}" onerror="this.onerror=null;this.src='img/bola.png';">
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${teams.name}</span>
                  <p>${teams.address}</p>
                </div>
                <div class ="card-action">
                <p><a href="${teams.website}">Lihat Website</a></p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamHTML;
    })
    .catch(error);
}

function getLeague() {
  if ('caches' in window) {
    caches.match(league_url).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var leagueHTML = "";
          data.standings[0].table.forEach(function(standing) {
            leagueHTML += `
            <tr>
            <td>${standing.position}</td>
            <td class="valign-wrapper"><img src="${
              standing.team.crestUrl
            }" width="20"> &nbsp;&nbsp;&nbsp; 
              <a href="./detail.html?id=${standing.team.id}">
                <b>${standing.team.name.substr(0, 3).toUpperCase()}</b>
              </a>
            </td>
            <td>${standing.playedGames}</td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td><b>${standing.points}</b></td>
            <td>${standing.goalsFor}</td>
            <td>${standing.goalsAgainst}</td>
            <td>${standing.goalDifference}</td>
        </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("league").innerHTML = leagueHTML;
        })
      }
    })
  }


  fetch(league_url, {
         headers: {
           'X-Auth-Token': '1fa14f02766a4927899b2392388f6bf4',
         },
       })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var leagueHTML = "";
      data.standings[0].table.forEach(function(standing) {
        leagueHTML += `
        <tr>
        <td>${standing.position}</td>
        <td class="valign-wrapper"><img src="${
          standing.team.crestUrl
        }" width="20"> &nbsp;&nbsp;&nbsp; 
          <a href="./detail.html?id=${standing.team.id}">
            <b>${standing.team.name.substr(0, 3).toUpperCase()}</b>
          </a>
        </td>
        <td>${standing.playedGames}</td>
        <td>${standing.won}</td>
        <td>${standing.draw}</td>
        <td>${standing.lost}</td>
        <td><b>${standing.points}</b></td>
        <td>${standing.goalsFor}</td>
        <td>${standing.goalsAgainst}</td>
        <td>${standing.goalDifference}</td>
    </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("league").innerHTML = leagueHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var teamHTML = `

            
        <div class="col s12 m7">
        <h2 class="header">${data.name}</h2>
        <div class="card horizontal">
        <div class="card-image">
          <img src="${data.crestUrl}" onerror="this.onerror=null;this.src='img/bola.png';">
        </div>
        <div class="card-stacked">
        <div class="card-content">
        <p>Alamat    : ${snarkdown(data.address)}</p>
        <p>Stadium   : ${snarkdown(data.venue)}</p>
        </div>
        <div class="card-action">
          <a href="${snarkdown(data.website)}">${snarkdown(data.website)}</a>
        </div>
        </div>
        </div>
        </div>
        
          `;

          var playersTeamHTML = "";
            data.squad.forEach(data => {
            if (data.role === "PLAYER") {
            playersTeamHTML += `
            <tr>
           <td>
            <span class="nama">${data.name}</span><br>
            <span class="from">From:</span> <span class="nationality">${data.nationality}</span>
            </td>
            <td><span class="position">${data.position}</span></td>
          </tr>`;
          }
          });
            // Sisipkan komponen card ke dalam elemen dengan id #content
          
            document.getElementById("body-content").innerHTML = teamHTML;

            document.getElementById("playertable").innerHTML = playersTeamHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + idParam, {
      headers: {
        'X-Auth-Token': '1fa14f02766a4927899b2392388f6bf4',
      },
    })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var teamHTML = `
        <div class="col s12 m7">
        <h2 class="header">${data.name}</h2>
        <div class="card horizontal">
        <div class="card-image">
          <img src="${data.crestUrl}" onerror="this.onerror=null;this.src='img/bola.png';">
        </div>
        <div class="card-stacked">
        <div class="card-content">
        <p>Alamat    : ${snarkdown(data.address)}</p>
        <p>Stadium   : ${snarkdown(data.venue)}</p>
        </div>
        <div class="card-action">
          <a href="${snarkdown(data.website)}">${snarkdown(data.website)}</a>
        </div>
        </div>
        </div>
        </div>
          `;

          var playersTeamHTML = "";
            data.squad.forEach(data => {
            if (data.role === "PLAYER") {
            playersTeamHTML += `
            <tr>
           <td>
            <span class="nama">${data.name}</span>
            </td>
            <td><span class="position">${data.position}</span></td>
            <td><span class="from">From:</span> <span class="nationality">${data.nationality}</span></td>
          </tr>`;
          }
          });

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;
        document.getElementById("playertable").innerHTML = playersTeamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamHTML = "";
    teams.forEach(function(teams) {
      var description = teams.name;
      teamHTML += `
                  <div class="card">
                    <a href="./detail.html?id=${teams.id}&saved=true" modal-trigger>
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${teams.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${teams.name}</span>
                      <p>${description}</p>
                    </div>
                    <div class="card-action">
                      <a onclick="deleteOnClick(${teams.id})">Hapus</a>       
                        </div>
                    </div>
                  </div>

                  
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamHTML;
  });
}


var deleteOnClick = idteam => {
  var confir = confirm("Hapus dari team favorite ?");
  if (confir == true) {
    deleteFavorite(idteam);
    location.reload();
  }
};




