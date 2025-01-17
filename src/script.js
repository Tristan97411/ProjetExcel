// Fonction pour charger dynamiquement un exercice
function loadExercise(exerciceId) {
    // Construire l'URL du fichier HTML à charger (par exemple exercice1.html)
    fetch(`${exerciceId}.html`)
        .then(response => response.text())
        .then(data => {
            // Injecter le contenu HTML dans la div #exercise-content
            const exerciseContainer = document.getElementById('exercise-content');
            if (!exerciseContainer) {
                console.error("Le conteneur pour l'exercice (#exercise-content) est introuvable.");
                return;
            }
            exerciseContainer.innerHTML = data;

            // Masquer tous les autres onglets principaux
            const tabContents = document.querySelectorAll(".tab-content");
            tabContents.forEach(tab => tab.style.display = "none");

            // Afficher l'exercice chargé
            const selectedExercise = document.getElementById(exerciceId);
            if (selectedExercise) {
                selectedExercise.style.display = "block";
            }

            // Initialiser les scripts spécifiques pour cet exercice
            initExercise(exerciceId);
        })
        .catch(error => console.error("Erreur lors du chargement de l'exercice : ", error));
}

// Fonction pour initialiser les événements spécifiques à chaque exercice
function initExercise(exerciceId) {
    switch (exerciceId) {
        case 'exercice1':
            initExercice1();  // Initialiser les événements pour l'exercice 1
            break;
        case 'exercice2':
            initExercice2();  // Initialiser les événements pour l'exercice 2
            break;
        // Ajoutez d'autres cas pour chaque exercice si nécessaire
        default:
            console.warn(`Pas de logique spécifique pour l'exercice ${exerciceId}`);
            break;
    }
}

// Fonction pour ouvrir les onglets principaux
function openTab(evt, tabName) {
    // Masquer toutes les sections
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Désactiver tous les liens de tabulation
    var links = document.querySelectorAll('.tab-link');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Afficher l'exercice sélectionné
    document.getElementById(tabName).classList.add('active');

    // Activer le lien du bouton sélectionné
    evt.currentTarget.classList.add('active');
}



function resetSubTabs(tabName) {
    // Récupérer uniquement les sous-onglets de l'onglet principal actif
    const allSubTabs = document.querySelectorAll(`#${tabName} .sub-tab-content`);
    const subTabLinks = document.querySelectorAll(`#${tabName} .sub-tab-link`);

    // Masquer tous les contenus de sous-onglets
    allSubTabs.forEach((subTab) => {
        subTab.style.display = "none";
        subTab.classList.remove("active");
    });

    // Désactiver tous les liens des sous-onglets
    subTabLinks.forEach((link) => link.classList.remove("active"));

    // Activer le premier sous-onglet si disponible
    const firstSubTab = allSubTabs[0];
    const firstSubTabLink = subTabLinks[0];

    if (firstSubTab && firstSubTabLink) {
        firstSubTab.style.display = "block";
        firstSubTab.classList.add("active");
        firstSubTabLink.classList.add("active");
    }
}




function openSubTab(evt, subTabId) {
    // Masquer tout le contenu des sous-onglets
    const subTabContents = document.querySelectorAll(".sub-tab-content");
    subTabContents.forEach(content => {
        content.style.display = "none";
        content.classList.remove("active");
    });

    // Retirer la classe 'active' de tous les boutons des sous-onglets
    const subTabLinks = document.querySelectorAll(".sub-tab-link");
    subTabLinks.forEach(link => link.classList.remove("active"));

    // Afficher le sous-onglet sélectionné
    const selectedSubTab = document.getElementById(subTabId);
    if (selectedSubTab) {
        selectedSubTab.style.display = "block";
        selectedSubTab.classList.add("active");
    } else {
        console.error(`Le sous-onglet avec l'ID "${subTabId}" est introuvable.`);
    }

    // Ajouter la classe 'active' au bouton cliqué
    evt.currentTarget.classList.add("active");
}



document.addEventListener('DOMContentLoaded', function () {
    // Vérifie l'onglet principal actif, sinon active le premier
    const activeTab = document.querySelector('.tab-link.active') || document.querySelector('.tab-link');
    if (activeTab) {
        const tabId = activeTab.getAttribute("onclick").split("'")[1];
        openTab({ currentTarget: activeTab }, tabId);
    }

    // Active le premier sous-onglet de l'onglet principal
    const activeTabId = document.querySelector('.tab-content.active')?.id;
    if (activeTabId) {
        resetSubTabs(activeTabId);
    }
});

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Inscription réussie. Redirection vers la connexion...');
            window.location.href = '/connexion'; // Redirige vers la page de connexion
        } else {
            const error = await response.text();
            alert(`Erreur : ${error}`);
        }
    } catch (err) {
        console.error('Erreur réseau :', err);
        alert('Une erreur est survenue. Réessayez plus tard.');
    }
});

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Connexion réussie
            alert('Connexion réussie ! Redirection vers l\'index...');
            window.location.href = '/index.html'; // Redirection vers la page principale
        } else {
            // Affiche le message d'erreur
            const errorMessage = await response.text();
            alert(`Erreur : ${errorMessage}`);
        }
    } catch (err) {
        console.error('Erreur réseau :', err);
        alert('Une erreur réseau est survenue. Réessayez plus tard.');
    }
});






// Données initiales des produits pour l'Exercice 1.2
const produits = [
    { id:1 , nom: "Produit A", achats: 89, ventes: 10 },
    { id:2 , nom: "Produit B", achats: 38, ventes: 20 },
    { id:3 , nom: "Produit C", achats: 19, ventes: 3 },
    { id:4 , nom: "Produit D", achats: 30, ventes: 30 },
    { id:5 , nom: "Produit E", achats: 35, ventes: 40 },
    { id:6 , nom: "Produit F", achats: 77, ventes: 10 },
    { id:7 , nom: "Produit G", achats: 63, ventes: 50 },
    { id:8 , nom: "Produit H", achats: 58, ventes: 42 },
    { id:9  , nom: "Produit I", achats: 74, ventes: 70 },
    { id:10 , nom: "Produit J", achats: 40, ventes: 40 }
];

// Fonction pour charger et afficher les produits dans le tableau
// Fonction pour charger et afficher les produits dans le tableau
function loadProductTable() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(produits => {
            const tableBody = document.querySelector("#salesTable tbody");
            let totalAchats = 0;
            let totalVentes = 0;
            let totalStock = 0;

            // Vider le contenu du tbody (pour éviter les doublons de lignes)
            tableBody.innerHTML = '';

            produits.forEach((produit, index) => {
                const stock = produit.achats - produit.ventes; // Stock individuel
                totalAchats += produit.achats;
                totalVentes += produit.ventes;
                totalStock += stock;

                // Créer une nouvelle ligne avec un bouton "Supprimer"
                const row = document.createElement("tr");
                row.setAttribute("data-id", produit.id); // Utilisation de l'ID pour la suppression

                row.innerHTML = `
                    <td>${produit.nom}</td>
                    <td><input type="number" value="${produit.achats}" data-field="achats" onchange="updateData(this)"></td>
                    <td><input type="number" value="${produit.ventes}" data-field="ventes" onchange="updateData(this)"></td>
                    <td><span class="stock">${stock}</span></td>
                    <td><button class="deleteBtn" onclick="deleteProduct(this)">Supprimer</button></td>
                `;
                
                // Ajouter la ligne au tbody
                tableBody.appendChild(row);
            });

            // Mettre à jour la ligne des totaux
            const totalRow = `
                <tr>
                    <th>Total</th>
                    <td><span id="totalAchats">${totalAchats}</span></td>
                    <td><span id="totalVentes">${totalVentes}</span></td>
                    <td><span id="totalStock">${totalStock}</span></td>
                </tr>
            `;

            const existingTotalRow = document.querySelector("#salesTable tfoot");
            if (existingTotalRow) {
                existingTotalRow.innerHTML = totalRow;
            } else {
                const tfoot = document.createElement("tfoot");
                tfoot.innerHTML = totalRow;
                document.querySelector("#salesTable").appendChild(tfoot);
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}





// Fonction pour mettre à jour les données (lorsque l'utilisateur modifie un champ)
// Fonction pour envoyer les données au serveur
function updateProductInDatabase(id, nom, achats, ventes, stock) {
    fetch('http://localhost:3000/update-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nom, achats, ventes, stock }) // Ajout de 'nom' dans la requête
    })
    .then(response => {
        console.log(`Réponse du serveur pour la mise à jour de l'id ${id}:`, response);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Produit mis à jour:', data);
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour du produit:', error);  
    });
}

// Fonction pour mettre à jour les données (lorsque l'utilisateur modifie un champ)
function updateData(inputElement) {
    // Trouver la ligne correspondante
    const row = inputElement.closest("tr");

    // Récupérer les champs de la ligne
    const achatsField = row.querySelector('input[data-field="achats"]');
    const ventesField = row.querySelector('input[data-field="ventes"]');
    const stockField = row.querySelector('.stock');

    // Récupérer les nouvelles valeurs, en s'assurant qu'elles sont des nombres
    const newAchats = parseInt(achatsField.value, 10) || 0;  // Valeur par défaut de 0 si non numérique
    const newVentes = parseInt(ventesField.value, 10) || 0;  // Valeur par défaut de 0 si non numérique

    // Recalculer le stock individuel (achats - ventes)
    const newStock = newAchats - newVentes;
    stockField.textContent = newStock; // Mettre à jour le stock dans la ligne

    // Recalculer les totaux
    updateTotals();
}


// Sauvegarde automatique des données toutes les 30 secondes
setInterval(() => {
    produits.forEach(produit => {
        const stock = produit.achats + produit.ventes;
        updateProductInDatabase(produit.id, produit.nom ,produit.achats, produit.ventes, stock);
    });
}, 30000); // Sauvegarde toutes les 30 secondes

// Fonction pour envoyer les données à la base de données avant de quitter la page
window.addEventListener("beforeunload", function(event) {
    // Sauvegarder toutes les modifications des produits avant de quitter la page
    produits.forEach(produit => {
        const stock = produit.achats + produit.ventes;
        updateProductInDatabase(produit.id, produit.nom, produit.achats, produit.ventes, stock);
    });
});


// Fonction pour mettre à jour les totaux
function updateTotals() {
    const tableBody = document.querySelector("#salesTable tbody");

    let totalAchats = 0;
    let totalVentes = 0;
    let totalStock = 0;

    // Parcourir chaque ligne du tableau et recalculer les totaux
    tableBody.querySelectorAll("tr").forEach(row => {
        const achatsField = row.querySelector('input[data-field="achats"]');
        const ventesField = row.querySelector('input[data-field="ventes"]');
        const stockField = row.querySelector('.stock');

        const achats = parseInt(achatsField.value, 10) || 0;
        const ventes = parseInt(ventesField.value, 10) || 0;
        const stock = achats - ventes;

        // Mettre à jour le stock dans la ligne
        stockField.textContent = stock;

        // Ajouter aux totaux
        totalAchats += achats;
        totalVentes += ventes;
        totalStock += stock;
    });

    // Mettre à jour les totaux dans le DOM
    document.getElementById("totalAchats").textContent = totalAchats;
    document.getElementById("totalVentes").textContent = totalVentes;
    document.getElementById("totalStock").textContent = totalStock;
}
// Fonction pour ajouter un produit
// Fonction pour ajouter un produit
function addNewProduct() {
    const newProductName = document.getElementById("newProductName").value;
    const newProductAchats = parseInt(document.getElementById("newProductAchats").value);
    const newProductVentes = parseInt(document.getElementById("newProductVentes").value);

    // Créer l'objet produit à envoyer au serveur
    const newProduct = {
        nom: newProductName,
        achats: newProductAchats,
        ventes: newProductVentes,
        stock: newProductAchats - newProductVentes
    };

    // Envoyer une requête POST pour ajouter le produit
    fetch('http://localhost:3000/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (response.ok) {
            // Si l'ajout réussit, recharger la table pour refléter les nouveaux produits
            loadProductTable();
        } else {
            console.error('Erreur lors de l\'ajout du produit');
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requête d\'ajout :', error);
    });
}

// Fonction pour ajouter une ligne dans le tableau des produits
function addProductRowToTable(product) {
    const tableBody = document.querySelector("#salesTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${product.nom}</td>
        <td><input type="number" value="${product.achats}" data-field="achats" onchange="updateData(this)"></td>
        <td><input type="number" value="${product.ventes}" data-field="ventes" onchange="updateData(this)"></td>
        <td><span class="stock">${product.stock}</span></td>
        <td><button class="deleteBtn" onclick="deleteProduct(this)">Supprimer</button></td>
    `;

    tableBody.appendChild(row);
}

function deleteProduct(button) {
    const row = button.closest("tr");
    const productId = row.getAttribute("data-id");

    // Si pas de productId, on ne fait rien
    if (!productId) {
        return;
    }

    // Faire une requête DELETE pour supprimer le produit dans la base de données
    fetch(`http://localhost:3000/delete-product/${productId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // Si la suppression a réussi, supprimer la ligne dans le tableau
            row.remove();
            updateTotals();
        } else {
            console.error('Erreur lors de la suppression du produit');
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requête de suppression :', error);
    });
}



// Fonction pour mettre à jour les totaux
function updateTotals() {
    const tableBody = document.querySelector("#salesTable tbody");
    let totalAchats = 0;
    let totalVentes = 0;
    let totalStock = 0;

    // Itérer à travers chaque ligne du tableau pour calculer les totaux
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => {
        const achatsField = row.querySelector('input[data-field="achats"]');
        const ventesField = row.querySelector('input[data-field="ventes"]');
        const stockField = row.querySelector('.stock');

        const achats = parseInt(achatsField.value, 10) || 0;
        const ventes = parseInt(ventesField.value, 10) || 0;
        const stock = achats - ventes;

        // Mettre à jour le stock dans la ligne
        stockField.textContent = stock;

        // Ajouter aux totaux
        totalAchats += achats;
        totalVentes += ventes;
        totalStock += stock;
    });

    // Mettre à jour les valeurs dans la ligne des totaux
    document.getElementById("totalAchats").textContent = totalAchats;
    document.getElementById("totalVentes").textContent = totalVentes;
    document.getElementById("totalStock").textContent = totalStock;
}


function addProductToServer(product) {
    fetch('http://localhost:3000/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du produit.");
        }
        return response.json();
    })
    .then(data => {
        console.log("Produit ajouté au serveur :", data);
        // Si tu veux, tu peux appeler la fonction pour actualiser la liste des produits
        loadProductTable();  // Par exemple pour recharger le tableau des produits
    })
    .catch(error => {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de l'ajout du produit.");
    });
}


// Appeler la fonction pour charger le tableau des produits au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadProductTable();
});
// Fonction pour ajouter une ligne dans le tableau des revenus
function updateRevenueTable() {
    const tableBody = document.querySelector("#revenueTable tbody");  // Sélectionner le tbody du tableau de chiffre d'affaires
    const rows = document.querySelectorAll("#salesTable tbody tr");  // Récupérer toutes les lignes du tableau des ventes
    
    // Vider le tableau du chiffre d'affaires avant de le remplir
    tableBody.innerHTML = '';

    rows.forEach(row => {
        // Récupérer les données du produit dans chaque ligne
        const productName = row.querySelector('td').textContent;  // Nom du produit
        const ventesField = row.querySelector('input[data-field="ventes"]');  // Nombre de ventes
        const prixUnitaireField = row.querySelector('input[data-field="prixUnitaire"]');  // Prix unitaire

        const ventes = parseInt(ventesField.value, 10) || 0;  // Récupérer et valider le nombre de ventes
        const prixUnitaire = parseFloat(prixUnitaireField.value) || 0;  // Récupérer et valider le prix unitaire
        const chiffreAffaires = ventes * prixUnitaire;  // Calcul du chiffre d'affaires

        // Créer une nouvelle ligne pour afficher le chiffre d'affaires
        const rowRevenue = document.createElement("tr");

        rowRevenue.innerHTML = `
            <td>${productName}</td>
            <td>${ventes}</td>
            <td>${prixUnitaire}</td>
            <td>${chiffreAffaires}</td>
        `;

        // Ajouter la ligne au tableau du chiffre d'affaires
        tableBody.appendChild(rowRevenue);
    });
}

// Données des pays et leur chiffre d'affaires
let countriesData = []; // Contiendra les données des pays

// Fonction pour ajouter un pays
function addNewCountry() {
    const countryName = document.getElementById("newCountryName").value;
    const countryRevenue = parseFloat(document.getElementById("newCountryRevenue").value);

    if (countryName && !isNaN(countryRevenue) && countryRevenue > 0) {
        // Ajouter le pays au tableau des données
        countriesData.push({
            pays: countryName,
            chiffreAffaires: countryRevenue
        });

        // Réinitialiser le formulaire
        document.getElementById("addCountryForm").reset();

        // Mettre à jour le tableau et recalculer les parts de marché
        updateMarketShareTable();
    } else {
        alert("Veuillez remplir correctement tous les champs.");
    }
}

// Fonction pour mettre à jour le tableau des parts de marché
function updateMarketShareTable() {
    const tableBody = document.querySelector("#marketShareTable tbody");
    const totalChiffreAffaires = countriesData.reduce((sum, country) => sum + country.chiffreAffaires, 0);

    // Vider le tableau avant de le remplir à nouveau
    tableBody.innerHTML = "";

    // Remplir le tableau avec les données mises à jour
    countriesData.forEach(country => {
        const partDeMarche = (country.chiffreAffaires / totalChiffreAffaires) * 100;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${country.pays}</td>
            <td>${formatCurrency(country.chiffreAffaires)}</td>
            <td>${partDeMarche.toFixed(2)}%</td>
        `;
        tableBody.appendChild(row);
    });

    // Afficher le total dans le footer
    document.getElementById("totalChiffreAffaires").textContent = formatCurrency(totalChiffreAffaires);
}

// Fonction pour formater les chiffres en monnaie (par exemple, en euros)
function formatCurrency(amount) {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}


// Fonction pour calculer et afficher les données
function loadMarketShareTable() {
    const tableBody = document.querySelector("#marketShareTable tbody");
    let totalChiffreAffaires = 0;

    // Calculer le total du chiffre d'affaires
    countriesData.forEach(country => {
        totalChiffreAffaires += country.chiffreAffaires;
    });

    // Remplir le tableau avec les données des pays
    countriesData.forEach(country => {
        const partDeMarche = (country.chiffreAffaires / totalChiffreAffaires) * 100;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${country.pays}</td>
            <td>${formatCurrency(country.chiffreAffaires)}</td>
            <td>${partDeMarche.toFixed(2)}%</td>
        `;
        tableBody.appendChild(row);
    });

    // Afficher le total dans le footer
    document.getElementById("totalChiffreAffaires").textContent = formatCurrency(totalChiffreAffaires);
}

// Fonction pour formater le chiffre d'affaires avec le symbole €
function formatCurrency(amount) {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

// Charger les données depuis la base de données
async function loadCountries() {
    try {
        const response = await fetch('/api/countries');
        
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des pays');
        }

        const countries = await response.json();
        const tableBody = document.querySelector('#marketShareTable tbody');
        tableBody.innerHTML = ''; // Réinitialiser le tableau

        let totalChiffreAffaires = 0;
        let totalPartDeMarche = 0;

        // Calculer le total du chiffre d'affaires
        countries.forEach(country => {
            const revenue = parseFloat(country.revenue); // Conversion explicite en nombre
            totalChiffreAffaires += revenue;
        });

        // Affichage des pays dans le tableau
        countries.forEach(country => {
            const revenue = parseFloat(country.revenue); // Conversion explicite en nombre
            const partDeMarche = totalChiffreAffaires > 0 ? (revenue / totalChiffreAffaires) * 100 : 0;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${country.name}</td>
                <td>${revenue.toFixed(2)} €</td>
                <td>${partDeMarche.toFixed(2)} %</td>
                <td>
                    <button onclick="deleteCountry(${country.id})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Mise à jour des totaux dans le tableau
        const totalChiffreAffairesElement = document.getElementById('totalChiffreAffaires');
        const totalPartDeMarcheElement = document.getElementById('totalPartDeMarche');

        // Vérification que les éléments existent avant de les mettre à jour
        if (totalChiffreAffairesElement && totalPartDeMarcheElement) {
            if (totalChiffreAffaires > 0) {
                totalChiffreAffairesElement.textContent = totalChiffreAffaires.toFixed(2) + " €";
                totalPartDeMarcheElement.textContent = "100,00 %"; // Parce que la somme des parts de marché est égale à 100%
            } else {
                totalChiffreAffairesElement.textContent = "0,00 €";
                totalPartDeMarcheElement.textContent = "N/A"; // Si aucun pays, on met N/A
            }
        }
    } catch (error) {
        console.error("Erreur dans le chargement des pays:", error);
        alert('Erreur lors du chargement des données.');
    }
}

// Fonction pour ajouter un pays
async function addNewCountry() {
    const name = document.getElementById('newCountryName').value.trim();
    const revenue = document.getElementById('newCountryRevenue').value.trim();

    if (!name || !revenue) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    try {
        const response = await fetch('/api/countries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, revenue })
        });

        if (!response.ok) throw new Error('Erreur lors de l\'ajout du pays.');

        alert('Pays ajouté avec succès!');
        document.getElementById('addCountryForm').reset();
        loadCountries(); // Recharge les pays après ajout
    } catch (error) {
        console.error(error);
        alert('Erreur lors de l\'ajout du pays.');
    }
}

// Fonction pour supprimer un pays
async function deleteCountry(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce pays ?')) return;

    try {
        const response = await fetch(`/api/countries/${id}`, { method: 'DELETE' });

        if (!response.ok) throw new Error('Erreur lors de la suppression du pays.');

        alert('Pays supprimé avec succès!');
        loadCountries(); // Recharge les pays après suppression
    } catch (error) {
        console.error(error);
        alert('Erreur lors de la suppression.');
    }
}
// Liste vide pour démarrer
const payments = [];

// Références aux éléments DOM
const tableBody = document.querySelector('#payment-table tbody');
const form = document.querySelector('#add-person-form');

// Fonction pour ajouter une ligne dans le tableau
function addRow(payment) {
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${payment.firstName}</td>
        <td>${payment.gender}</td>
        <td style="color: ${payment.amountPaid > 0 ? 'green' : 'red'};">
            ${payment.amountPaid > 0 ? payment.amountPaid + '€' : 'Non payé'}
        </td>
        <td>
            <button class="delete-btn" data-id="${payment.id}">Supprimer</button>
        </td>
    `;
    
    paymentsTableBody.appendChild(row);

    // Ajouter un écouteur d'événement pour la suppression
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        const id = deleteButton.getAttribute('data-id'); // Récupère l'id depuis l'attribut data-id
        deletePayment(id); // Passe l'id à la fonction deletePayment
    });
}

// Fonction pour supprimer un paiement
async function deletePayment(paymentId) {
    const response = await fetch(`/delete-payment/${paymentId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        loadPayments();  // Recharge les paiements après la suppression
    } else {
        alert('Erreur lors de la suppression du paiement');
    }
}

async function loadPayments() {
    const response = await fetch('/payments');

    if (response.ok) {
        const data = await response.json();

        // Log des données pour vérifier leur format
        console.log('Paiements récupérés pour le tableau croisé dynamique:', data);

        if (Array.isArray(data)) {
            console.log('C\'est un tableau:', data);

            // Met à jour le tableau global payments
            payments.length = 0; // Réinitialise le tableau global
            payments.push(...data); // Ajoute les nouvelles données

            // Affiche les paiements dans le tableau (exercice 2)
            const paymentsTableBody = document.getElementById('paymentsTableBody');
            paymentsTableBody.innerHTML = ''; // Réinitialise le contenu du tableau

            payments.forEach(payment => {
                addRow(payment); // Ajoute chaque ligne au tableau
            });
        } else {
            console.error('Les données récupérées ne sont pas un tableau');
        }
    } else {
        console.error('Erreur lors du chargement des paiements');
    }
}



// Appeler la fonction pour charger les paiements au démarrage
loadPayments();



// Lors de l'ajout d'un paiement
document.getElementById('addPaymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.querySelector('#firstName').value;
    const gender = document.querySelector('#gender').value;
    const amountPaid = parseFloat(document.querySelector('#amountPaid').value);

    if (isNaN(amountPaid)) {
        alert("Le montant payé n'est pas valide.");
        return;
    }

    const newPerson = { firstName, gender, amountPaid };

    // Envoie les données au serveur pour les enregistrer dans la base de données
    const response = await fetch('/add-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPerson),
    });

    if (response.ok) {
        loadPayments();  // Recharge les paiements
    } else {
        alert('Erreur lors de l\'ajout du paiement');
    }

    // Réinitialise le formulaire
    document.getElementById('addPaymentForm').reset();
});


let pivotChart; // Pour stocker l'instance du graphique

document.getElementById('generatePivotButton').addEventListener('click', async () => {
    const response = await fetch('/payments');

    if (response.ok) {
        const payments = await response.json(); // Récupère les paiements depuis le serveur
        console.log('Paiements récupérés pour le tableau croisé dynamique:', payments); // DEBUG

        const pivotData = generatePivotData(payments); // Transforme les données en tableau croisé
        console.log('Données pivot:', pivotData); // DEBUG
        
        renderPivotChart(pivotData); // Affiche les données dans le graphique
    } else {
        alert('Erreur lors de la récupération des paiements.');
    }
});

function renderPivotChart(pivotData) {
    // Vérifier que les données sont correctement formatées
    console.log('Données pivot pour le graphique:', pivotData);

    // Assure-toi que les montants sont des nombres valides
    const hommePayes = parseFloat(pivotData.homme.totalPayes) || 0;
    const femmePayes = parseFloat(pivotData.femme.totalPayes) || 0;

    // Si l'un des montants payés est NaN, afficher un message d'erreur
    if (isNaN(hommePayes) || isNaN(femmePayes)) {
        console.error('Montants payés invalides pour le graphique');
        return;
    }

    console.log('Montants payés par genre:', hommePayes, femmePayes);

    // Vérifier si pivotChart existe avant de le détruire
    if (window.pivotChart && window.pivotChart.destroy) {
        window.pivotChart.destroy();  // Détruire l'ancien graphique si nécessaire
    }

    const ctx = document.getElementById('pivotChart').getContext('2d');
    
    const gradientBlue = ctx.createLinearGradient(0, 0, 0, 400);
gradientBlue.addColorStop(0, 'rgba(0, 123, 255, 0.7)');
gradientBlue.addColorStop(1, 'rgba(0, 123, 255, 0.1)');

const gradientPink = ctx.createLinearGradient(0, 0, 0, 400);
gradientPink.addColorStop(0, 'rgba(255, 99, 132, 0.7)');
gradientPink.addColorStop(1, 'rgba(255, 99, 132, 0.1)');

window.pivotChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Hommes', 'Femmes'],
        datasets: [{
            label: 'Montant payé',
            data: [hommePayes, femmePayes],
            backgroundColor: [gradientBlue, gradientPink],
            borderColor: ['blue', 'pink'],
            borderWidth: 1
        }]
    },
        options: {
            animation: {
                duration: 1000, // Durée de l'animation en millisecondes
                easing: 'easeOutBounce' // Effet de rebond
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Montant payé: ${context.raw.toFixed(2)} €`;
                        }
                    }
                }
            },
            onClick: (e, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index; // Index de la barre cliquée
                    const label = e.chart.data.labels[index]; // Label correspondant
                    const value = e.chart.data.datasets[0].data[index]; // Valeur correspondante
                    alert(`${label} a payé ${value.toFixed(2)} €`);
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2) + ' €'; // Format monétaire
                        }
                    }
                }
            }
        },
        
    });
}

function generatePivotData(payments) {
    const pivotData = {
        homme: {
            totalPayes: 0,
            totalNonPayes: 0,
            nombrePayes: 0,
            nombreNonPayes: 0
        },
        femme: {
            totalPayes: 0,
            totalNonPayes: 0,
            nombrePayes: 0,
            nombreNonPayes: 0
        }
    };

    payments.forEach(payment => {
        const genderKey = payment.gender.toLowerCase();  // Assure-toi que 'gender' est bien défini
        const amountPaid = parseFloat(payment.amountPaid);  // Convertir en nombre
        
        if (isNaN(amountPaid)) {
            console.warn(`Montant non valide pour ${payment.firstName}:`, payment.amountPaid);
            return; // Si amountPaid n'est pas un nombre valide, on saute cette entrée
        }

        if (amountPaid > 0) {
            pivotData[genderKey].totalPayes += amountPaid;
            pivotData[genderKey].nombrePayes++;
        } else {
            pivotData[genderKey].totalNonPayes += amountPaid;
            pivotData[genderKey].nombreNonPayes++;
        }
    });

    return pivotData;
}


function renderPivotTable(pivotData) {
    const pivotTableBody = document.getElementById('pivotTableBody');
    if (!pivotTableBody) {
        console.error("pivotTableBody non trouvé");
        return;
    }

    // Vider le contenu précédent
    pivotTableBody.innerHTML = '';

    // Si pivotData est valide, on affiche les données
    Object.keys(pivotData).forEach(gender => {
        const data = pivotData[gender];

        // Créer une nouvelle ligne dans le tableau pour chaque genre
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${gender}</td>
        <td>${data.nombrePayes}</td>
        <td>${data.totalPayes.toFixed(2)} €</td>
        <td>${((data.totalPayes / totalMontant) * 100).toFixed(2)}%</td>
    `;
        pivotTableBody.appendChild(row);
    });
}


function rechercheX(sexe) {
    if (payments.length === 0) {
        console.error('Le tableau des paiements est vide');
        return "Aucun paiement disponible pour la recherche.";
    }

    const trimmedSexe = sexe.trim().toLowerCase();
    console.log("Recherche de sexe :", trimmedSexe);

    const filteredPayments = payments.filter(p => {
        console.log(p.gender.toLowerCase().trim());
        return p.gender.toLowerCase().trim() === trimmedSexe;
    });

    console.log("Résultat rechercheX :", filteredPayments);
    if (filteredPayments.length > 0) {
        return filteredPayments.map(p => `Prénom : ${p.firstName}, Montant payé : ${p.amountPaid}€`).join('<br>');
    } else {
        return `Aucun utilisateur trouvé avec le sexe ${sexe}`;
    }
}



// Affichage des résultats dans la div
function afficherResultats(resultats) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = resultats; // Affiche les résultats dans la div
}

document.getElementById('searchVButton').addEventListener('click', function() {
    const prenomRecherche = document.getElementById('prenomInput').value.trim();
    console.log('Prénom recherché:', prenomRecherche); // Vérifie que le prénom recherché est correct

    const resultat = rechercheVParPrenom(prenomRecherche);
    const resultsDiv = document.getElementById('results');

    if (resultat) {
        resultsDiv.innerHTML = `Utilisateur trouvé : ${resultat.firstName}, Montant payé : ${resultat.amountPaid}€`;
    } else {
        resultsDiv.innerHTML = "Aucun utilisateur trouvé avec le prénom " + prenomRecherche;
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    await loadPayments();  // Charger les paiements au chargement de la page
    enableSearchButtons(); // Une fois les paiements chargés, activer les boutons de recherche
});

// Fonction pour activer les boutons de recherche après avoir chargé les paiements
function enableSearchButtons() {
    document.getElementById('searchVButton').disabled = false;
    document.getElementById('searchXButton').disabled = false;
}
function rechercheVParPrenom(prenomRecherche) {
    return payments.find(payment => 
        payment.firstName.trim().toLowerCase() === prenomRecherche.trim().toLowerCase()
    );
}



document.getElementById('searchXButton').addEventListener('click', function() {
    const sexeRecherche = document.getElementById('sexeInput').value.trim();
    console.log('Sexe recherché:', sexeRecherche);  // Vérifie que le sexe recherché est correct

    const resultats = rechercheX(sexeRecherche);
    afficherResultats(resultats);
});

document.getElementById('calculationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const price = parseFloat(document.getElementById('price').value);
    const isGrossiste = document.getElementById('isGrossiste').value === 'true';
    const isPaiementComptant = document.getElementById('isPaiementComptant').value === 'true';
    const isVenteEmportee = document.getElementById('isVenteEmportee').value === 'true';

    // Calcul des remises
    let remise = 0;
    if (isGrossiste) remise += 0.02; // 2% pour les grossistes
    if (price > 10000) remise += 0.05; // 5% si le prix dépasse 10 000 €

    // Calcul des escomptes
    let escompte = 0;
    if (isPaiementComptant && isGrossiste) escompte = 0.02; // 2% pour les grossistes payant comptant
    else if (isPaiementComptant) escompte = 0.01; // 1% pour paiement comptant seul

    // Calcul des frais de port
    let fraisDePort = 0;
    if (isVenteEmportee) fraisDePort += 50; // 50€ de frais de port pour vente à emporter
    if (price * (1 - remise) > 15000) fraisDePort += 100; // Si total > 15 000€, frais supplémentaires

    // Calcul de la TVA
    const tvaRate = 19.6 / 100; // TVA de 19.60%
    const priceAfterRemise = price * (1 - remise);
    const priceAfterEscompte = priceAfterRemise * (1 - escompte);
    const tva = priceAfterEscompte * tvaRate;
    const total = priceAfterEscompte + fraisDePort + tva;

    // Afficher les résultats dans le tableau
    const resultsTable = document.getElementById('calculationResults').getElementsByTagName('tbody')[0];
    const newRow = resultsTable.insertRow();

    newRow.insertCell(0).textContent = price.toFixed(2); // Prix initial
    newRow.insertCell(1).textContent = (remise * 100).toFixed(2); // Remises
    newRow.insertCell(2).textContent = (escompte * 100).toFixed(2); // Escompte
    newRow.insertCell(3).textContent = fraisDePort.toFixed(2); // Frais de port
    newRow.insertCell(4).textContent = (tvaRate * 100).toFixed(2); // TVA
    newRow.insertCell(5).textContent = total.toFixed(2); // Total

    // Ajout du bouton de suppression pour chaque ligne
    const deleteCell = newRow.insertCell(6);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = () => deleteRow(newRow, total); // Passer la ligne à supprimer
    deleteCell.appendChild(deleteButton);

    // Sauvegarder les données dans la base de données
    const response = await fetch('http://localhost:3000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, remise, escompte, fraisDePort, tva, total , isGrossiste,
            isPaiementComptant,
            isVenteEmportee })
    });

    if (response.ok) {
        console.log('Calcul enregistré avec succès');
    } else {
        console.error('Erreur lors de l\'enregistrement du calcul');
    }
});

// Ajouter une ligne au tableau
function addRowToTable(calculation) {
    const resultsTable = document.getElementById('calculationResults').getElementsByTagName('tbody')[0];
    const newRow = resultsTable.insertRow();

    newRow.insertCell(0).textContent = calculation.price.toFixed(2);
    newRow.insertCell(1).textContent = calculation.remise.toFixed(2);
    newRow.insertCell(2).textContent = calculation.escompte.toFixed(2);
    newRow.insertCell(3).textContent = calculation.fraisDePort.toFixed(2);
    newRow.insertCell(4).textContent = calculation.tva.toFixed(2);
    newRow.insertCell(5).textContent = calculation.total.toFixed(2);

    // Ajouter le bouton de suppression
    const deleteCell = newRow.insertCell(6);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = () => deleteRow(newRow, calculation.id);  // Utiliser l'ID pour supprimer
    deleteCell.appendChild(deleteButton);
}

// Initialisation et récupération des calculs existants au chargement
window.onload = function() {
    fetchCalculations();
};

function fetchCalculations() {
    fetch('http://localhost:3000/get-calculations')
        .then(response => response.json())
        .then(data => {
            const resultsTable = document.getElementById('resultsTable');
            const tbody = resultsTable.querySelector('tbody');
            tbody.innerHTML = ''; // Réinitialiser le tableau

            data.forEach(calculation => {
                const row = document.createElement('tr');

                // Ajout des cellules sans afficher l'ID
                const priceCell = document.createElement('td');
                priceCell.textContent = calculation.price.toFixed(2);
                row.appendChild(priceCell);

                const remiseCell = document.createElement('td');
                remiseCell.textContent = calculation.remise.toFixed(2);
                row.appendChild(remiseCell);

                const escompteCell = document.createElement('td');
                escompteCell.textContent = calculation.escompte.toFixed(2);
                row.appendChild(escompteCell);

                const fraisDePortCell = document.createElement('td');
                fraisDePortCell.textContent = calculation.fraisDePort.toFixed(2);
                row.appendChild(fraisDePortCell);

                const tvaCell = document.createElement('td');
                tvaCell.textContent = calculation.tva.toFixed(2);
                row.appendChild(tvaCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = calculation.total.toFixed(2);
                row.appendChild(totalCell);

                // Bouton supprimer
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.onclick = function () {
                    deleteRow(calculation.id); // Passe l'ID pour la suppression
                };

                const deleteCell = document.createElement('td');
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des calculs :', error));
}



// Fonction pour ajouter un nouveau calcul au tableau et le sauvegarder
function addCalculationToTable(calculation) {
    const resultsTable = document.getElementById('resultsTable');
    const tbody = resultsTable.querySelector('tbody');

    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = calculation.id;
    row.appendChild(idCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = calculation.price;
    row.appendChild(priceCell);

    const remiseCell = document.createElement('td');
    remiseCell.textContent = calculation.remise;
    row.appendChild(remiseCell);

    const escompteCell = document.createElement('td');
    escompteCell.textContent = calculation.escompte;
    row.appendChild(escompteCell);

    const fraisDePortCell = document.createElement('td');
    fraisDePortCell.textContent = calculation.fraisDePort;
    row.appendChild(fraisDePortCell);

    const tvaCell = document.createElement('td');
    tvaCell.textContent = calculation.tva;
    row.appendChild(tvaCell);

    const totalCell = document.createElement('td');
    totalCell.textContent = calculation.total;
    row.appendChild(totalCell);

    // Bouton supprimer
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = function() {
        deleteRow(calculation.id);
    };

    const deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
}

function deleteRow(calculationId) {
    if (!Number.isInteger(calculationId)) {
        console.error('ID de calcul invalide :', calculationId);
        return;
    }

    fetch(`http://localhost:3000/delete-calculation/${calculationId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log(`Calcul avec ID ${calculationId} supprimé.`);
                fetchCalculations(); // Recharge le tableau après suppression
            } else {
                throw new Error(`Erreur lors de la suppression du calcul avec ID ${calculationId}`);
            }
        })
        .catch(error => console.error('Erreur lors de la suppression du calcul :', error));
}

document.getElementById("ajoutForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const annee = document.getElementById("annee").value;
    const chiffreAffaire = document.getElementById("chiffreAffaire").value;

    // Ajouter les données au backend
    saveData(annee, chiffreAffaire);

    // Réinitialiser les champs
    document.getElementById("annee").value = "";
    document.getElementById("chiffreAffaire").value = "";
});

async function saveData(annee, chiffreAffaire) {
    await fetch('/ajouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ annee, chiffreAffaire })
    });

    // Mettre à jour les statistiques et le tableau
    await updateStats();
    await loadTableData();
}

async function updateStats() {
    const response = await fetch('/statistiques');
    const stats = await response.json();

    document.getElementById("minChiffreAffaire").textContent = stats.minChiffreAffaire;
    document.getElementById("maxChiffreAffaire").textContent = stats.maxChiffreAffaire;
    document.getElementById("moyenne").textContent = stats.moyenne;
}

async function loadTableData() {
    const response = await fetch('/donnees');
    const data = await response.json();

    const tbody = document.querySelector("#salesTable-unique tbody");
    tbody.innerHTML = "";  // Réinitialiser le tableau avant de le remplir

    data.forEach((item) => {
        const trId = `row_${item.id}`; // Utiliser l'ID réel de la base de données
        
        const tr = document.createElement("tr");
        tr.setAttribute('id', trId);

        // Création de la ligne avec un bouton supprimer
        tr.innerHTML = `
            <td>${item.annee}</td>
            <td>${item.chiffreAffaire}</td>
            <td><button class="delete-btn" onclick="deleteRow(${item.id})">Supprimer</button></td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Fonction pour supprimer une ligne
async function deleteRow2(id) {
    const response = await fetch(`/delete/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        // Si la suppression réussit, on retire la ligne du tableau
        document.getElementById(`row_${id}`).remove();
        alert('Ligne supprimée avec succès');

        // Mettre à jour les statistiques après suppression
        await updateStats();
    } else {
        // Gérer les erreurs (si l'ID n'est pas trouvé ou autre)
        alert('Erreur lors de la suppression de la ligne');
    }
}

function showMessage(message, type = 'success') {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = `<p style="color: ${type === 'success' ? 'green' : 'red'};">${message}</p>`;
    setTimeout(() => {
        messagesDiv.innerHTML = ''; // Effacer le message après 3 secondes
    }, 3000);
}




// Charger les données initiales et les statistiques au démarrage de la page
loadTableData();
updateStats();



// Créer un bouton pour générer le tableau croisé dynamique
document.getElementById('generatePivotButton').addEventListener('click', generatePivotData);


// Charger les données au démarrage
document.addEventListener('DOMContentLoaded', loadCountries);

document.addEventListener('DOMContentLoaded', () => {
    loadPayments();  // Charger les paiements dès le chargement de la page
});


// Charger le tableau lors du chargement de la page
window.onload = loadMarketShareTable;

function showNotification(type, message) {
    const notificationsContainer = document.getElementById('notificationsContainer');

    // Créer l'élément notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Ajouter une icône avec FontAwesome
    const icon = document.createElement('span');
    icon.className = 'icon';
    if (type === 'success') {
        icon.className += ' fas fa-check-circle'; // Succès
    } else if (type === 'error') {
        icon.className += ' fas fa-times-circle'; // Erreur
    } else if (type === 'info') {
        icon.className += ' fas fa-info-circle'; // Info
    }

    // Ajouter le message
    const text = document.createElement('span');
    text.textContent = message;

    // Assembler l'icône et le texte
    notification.appendChild(icon);
    notification.appendChild(text);

    // Ajouter la notification au conteneur
    notificationsContainer.appendChild(notification);

    // Supprimer automatiquement la notification après 4 secondes
    setTimeout(() => {
        notification.remove();
    }, 4000);
}
function log(type, message) {
    console.log(message); // Garde le log pour le debug
    showNotification(type, message); // Affiche une notification
}

const sendResponse = (res, status, type, message, data = null) => {
    res.status(status).json({
        type,
        message,
        data
    });
};

document.getElementById('logoutButton').addEventListener('click', () => {
    fetch('/logout', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                window.location.href = '/connexion.html';
            } else {
                console.error('Erreur lors de la déconnexion.');
            }
        });
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/check-session')
        .then(response => response.json())
        .then(data => {
            if (!data.loggedIn) {
                // Si non connecté, redirige vers connexion.html
                window.location.href = '/connexion.html';
            } else {
                console.log('Utilisateur connecté :', data.user);
            }
        });
});



module.exports = {
    success: (res, message, data = null) => sendResponse(res, 200, 'success', message, data),
    error: (res, message, status = 500, details = null) => sendResponse(res, status, 'error', message, { details })
};


