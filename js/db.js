var dbPromised = idb.open("football-teams", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil di simpan.");
      alert("Team Berhasil Disimpan!");
    })
    .catch(function() {
      console.log('Team gagal disimpan.')
      alert("Team Sudah Tersimpan");
  });
    
}

 function getAll() {
   return new Promise(function(resolve, reject) {
     dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
        //console.log(teams);
      });
  });
}

function deleteFavorite(idteam) {
  dbPromised.then(function (db) {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
    store.delete(idteam);
    return tx.complete;
  });
}
