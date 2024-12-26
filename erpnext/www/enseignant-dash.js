$(document).ready(function () {
    // Ajouter dynamiquement un enseignement
    $("#add-enseignement").on("click", function () {
        $("#enseignements").append(`
            <div class="enseignement-item">
                <label>Année Univ. :</label>
                <input type="text" name="annee_universitaire[]" class="form-control">
                <label>Filière :</label>
                <input type="text" name="filiere[]" class="form-control">
                <label>Semestre :</label>
                <input type="text" name="semestre[]" class="form-control">
                <label>Cours :</label>
                <input type="text" name="cours[]" class="form-control">
                <label>TD :</label>
                <input type="text" name="td[]" class="form-control">
                <label>TP :</label>
                <input type="text" name="tp[]" class="form-control">
                <button type="button" class="btn btn-danger remove-enseignement">Supprimer</button>
            </div>
        `);
    });

    // Supprimer dynamiquement un enseignement
    $(document).on("click", ".remove-enseignement", function () {
        $(this).closest(".enseignement-item").remove();
    });

    // Ajouter dynamiquement un encadrement
    $("#add-encadrement").on("click", function () {
        $("#encadrements").append(`
            <div class="encadrement-item">
                <label>Année Univ. :</label>
                <input type="text" name="annee_universitaire_enc[]" class="form-control">
                <label>Type Licence :</label>
                <input type="text" name="type_licence[]" class="form-control">
                <label>Titre PFE :</label>
                <input type="text" name="titre_pfe[]" class="form-control">
                <label>Étudiants :</label>
                <input type="text" name="etudiants[]" class="form-control">
                <label>Nom(s) des encadrants :</label>
                <input type="text" name="nom_encadrants[]" class="form-control">
                <button type="button" class="btn btn-danger remove-encadrement">Supprimer</button>
            </div>
        `);
    });

    // Supprimer dynamiquement un encadrement
    $(document).on("click", ".remove-encadrement", function () {
        $(this).closest(".encadrement-item").remove();
    });

    // Soumettre le formulaire au serveur Frappe avec frappe.call
    $("#enseignant-form").on("submit", function (event) {
        event.preventDefault();

        // Récupérer les données des champs principaux
        const formData = {
            nom: $("#nom").val(),
            prenom: $("#prenom").val(),
            cadre: $("#cadre").val(),
            grade: $("#grade").val(),
            etablissement: $("#etablissement").val(),
            departement: $("#departement").val(),
            periode_avancement_consideree: $("#periode_avancement_consideree").val(),
            enseignements_cycle: [],
            encadrement_licence: []
        };

        // Récupérer les enseignements
        $("#enseignements .enseignement-item").each(function () {
            formData.enseignements_cycle.push({
                annee_universitaire: $(this).find('input[name="annee_universitaire[]"]').val(),
                filiere: $(this).find('input[name="filiere[]"]').val(),
                semestre: $(this).find('input[name="semestre[]"]').val(),
                cours: $(this).find('input[name="cours[]"]').val(),
                td: $(this).find('input[name="td[]"]').val(),
                tp: $(this).find('input[name="tp[]"]').val()
            });
        });

        // Récupérer les encadrements
        $("#encadrements .encadrement-item").each(function () {
            formData.encadrement_licence.push({
                annee_universitaire: $(this).find('input[name="annee_universitaire_enc[]"]').val(),
                type_licence: $(this).find('input[name="type_licence[]"]').val(),
                titre_pfe: $(this).find('input[name="titre_pfe[]"]').val(),
                etudiants: $(this).find('input[name="etudiants[]"]').val(),
                nom_encadrants: $(this).find('input[name="nom_encadrants[]"]').val()
            });
        });

        // Appel à l'API REST de Frappe avec frappe.call
        frappe.call({
            method: 'frappe.client.insert',
            args: {
                doc: {
                    doctype: 'Enseignant',
                    ...formData
                }
            },
            success: function(r) {
                alert("Enseignant ajouté avec succès !");
                console.log(r);
            },
            error: function(r) {
                alert("Erreur lors de l'ajout !");
                console.error(r);
            }
        });
    });
});
