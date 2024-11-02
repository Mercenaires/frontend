<!DOCTYPE html>
<html lang="fr">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recherche YouTube</title>
<style>
    body {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
    background-color: #f4f4f4;
}
    input[type="text"] {
    width: 300px;
    padding: 10px;
    margin-right: 10px;
}
    button {
    padding: 10px 15px;
    cursor: pointer;
}
    ul {
    list-style-type: none;
    padding: 0;
}
    li {
    background: white;
    margin: 5px 0;
    padding: 10px;
    border-radius: 4px;
}
</style>
</head>
<body>
<h1>Recherche de Vidéos YouTube</h1>
<input type="text" id="searchQuery" placeholder="Entrez votre recherche...">
    <button id="searchButton">Rechercher</button>
    <h2>Résultats :</h2>
    <ul id="resultsList"></ul>

    <script>
        document.getElementById("searchButton").addEventListener("click", function() {
        const query = document.getElementById("searchQuery").value;
        if (query) {
        fetchVideos(query);
    } else {
        alert("Veuillez entrer une requête de recherche !");
    }
    });

        function fetchVideos(query) {
        const apiUrl = `http://localhost:8080/youtube/search?query=${encodeURIComponent(query)}`;

        fetch(apiUrl)
        .then(response => {
        if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
    }
        return response.json();
    })
        .then(data => {
        displayResults(data);
    })
        .catch(error => {
        console.error("Erreur :", error);
        alert("Une erreur s'est produite lors de la recherche des vidéos.");
    });
    }

        function displayResults(videos) {
        const resultsList = document.getElementById("resultsList");
        resultsList.innerHTML = ""; // Effacer les résultats précédents

        if (videos.length === 0) {
        resultsList.innerHTML = "<li>Aucune vidéo trouvée.</li>";
        return;
    }

        videos.forEach(video => {
        const li = document.createElement("li");
        li.textContent = video; // Titre de la vidéo
        resultsList.appendChild(li);
    });
    }
    </script>
</body>
</html>
