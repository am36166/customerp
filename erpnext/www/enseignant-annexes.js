$(document).ready(function() {
    let currentStep = 1;
    const totalSteps = $(".form-step").length;

    $(".next-step").click(function() {
        if (currentStep < totalSteps) {
            $(`.form-step[data-step="${currentStep}"]`).removeClass("active");
            currentStep++;
            $(`.form-step[data-step="${currentStep}"]`).addClass("active");
            
            if (currentStep > 1) {
                $(".prev-step").show();
            }

            if (currentStep === totalSteps) {
                $(".next-step").hide();
                $(".submit-form").show();
            }

            updateStepIndicators(currentStep);
        }
        });
    });

    $(".prev-step").click(function() {
        if (currentStep > 1) {
            $(`.form-step[data-step="${currentStep}"]`).removeClass("active");
            currentStep--;
            $(`.form-step[data-step="${currentStep}"]`).addClass("active");
            
            if (currentStep === 1) {
                $(".prev-step").hide();
            }

            if (currentStep < totalSteps) {
                $(".next-step").show();
                $(".submit-form").hide();
            }

            updateStepIndicators(currentStep);
        }
    });

    function updateStepIndicators(step) {
        $(".step").removeClass("active completed");
        $(".step-line").removeClass("completed");

        for (let i = 1; i <= step; i++) {
            $(`.step[data-step="${i}"]`).addClass(i < step ? "completed" : "active");
            if (i < step) {
                $(`.step-line`).addClass("completed");
            }
        }
    }
    
      
      function addDynamicField(container, fields) {
          $(container).append(`
              <div class="dynamic-item mt-3 p-3 border rounded">
                  ${fields}
                  <button type="button" class="btn btn-danger remove-dynamic-item mt-2">Supprimer</button>
              </div>
          `);
      }


    $("#add-enseignement-licence").click(function() {
        addDynamicField("#enseignements-licence", `
            <label for="annee_universitaire" class="form-label">Année Univ. :</label>
            <input type="text" name="annee_universitaire[]" class="form-control">
            <label for="filiere" class="form-label">Filière :</label>
            <input type="text" name="filiere[]" class="form-control">
            <label for="semestre" class="form-label">Semestre :</label>
            <input type="text" name="semestre[]" class="form-control">
            <label for="cours" class="form-label">Cours :</label>
            <input type="text" name="cours[]" class="form-control">
            <label for="td" class="form-label">TD :</label>
            <input type="text" name="td[]" class="form-control">
            <label for="tp" class="form-label">TP :</label>
            <input type="text" name="tp[]" class="form-control">
            <label>VH(*) :</label>
            <input type="text" name="vh[]" class="form-control">

        `);
          
    });

    $("#add-encadrement-licence").click(function() {
        addDynamicField("#encadrements-licence", `
            <label for="annee_universitaire" class="form-label">Année Univ. :</label>
            <input type="text" name="annee_universitaire_enc[]" class="form-control">
            <label for="type_licence" class="form-label">Type Licence :</label>
            <input type="text" name="type_licence[]" class="form-control">
            <label for="titre_pfe" class="form-label">Titre PFE :</label>
            <input type="text" name="titre_pfe[]" class="form-control">
            <label for="etudiants" class="form-label">Étudiants :</label>
            <input type="text" name="etudiants[]" class="form-control">
            <label for="nom_encadrants" class="form-label">Nom(s) des encadrants :</label>
            <input type="text" name="nom_encadrants[]" class="form-control">
        `);
    });

    $("#add-enseignement-master").click(function() {
        addDynamicField("#enseignements-master", `
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
            <label>VH(*) :</label>
            <input type="text" name="vh[]" class="form-control">
        `);
    });

    $("#add-encadrement-master").click(function() {
        addDynamicField("#encadrements-master", `
             <label for="annee_universitaire" class="form-label">Année Univ. :</label>
            <input type="text" name="annee_universitaire_enc[]" class="form-control">
            <label for="type_licence" class="form-label">Filière et Type de Master (MF/MS) :</label>
            <input type="text" name="type_licence[]" class="form-control">
            <label for="titre_pfe" class="form-label">Titre du Mémoire:</label>
            <input type="text" name="titre_pfe[]" class="form-control">
            <label for="etudiants" class="form-label">Nom(s) de(s) étudiant(s) :</label>
            <input type="text" name="etudiants[]" class="form-control">
            <label for="nom_encadrants" class="form-label">Nom(s) des encadrants :</label>
            <input type="text" name="nom_encadrants[]" class="form-control">

        `);
    });


    $("#add-responsabilite-licence").click(function() {
        addDynamicField("#responsabilites-licence", `
            <label>Années Univ. :</label>
            <input type="text" name="annees_univ[]" class="form-control">
            <label>Filière :</label>
            <input type="text" name="filiere[]" class="form-control">
            <label>Semestre :</label>
            <input type="text" name="semestre[]" class="form-control">
            <label>Intitulé du module :</label>
            <input type="text" name="module[]" class="form-control">
        `);
    });

    

    $("#add-responsabilite-master").click(function() {
        addDynamicField("#responsabilites-master", `
            <label>Années Univ. :</label>
            <input type="text" name="annees_univ[]" class="form-control">
            <label>Filière :</label>
            <input type="text" name="filiere[]" class="form-control">
            <label>Semestre :</label>
            <input type="text" name="semestre[]" class="form-control">
            <label>Intitulé du module :</label>
            <input type="text" name="module[]" class="form-control">

        `);
    });

    $(document).on('click', '.remove-dynamic-item', function() {
        $(this).closest('.dynamic-item').remove();
    });


$("#enseignant-form").submit(function(event) {
        event.preventDefault();
        let formData = {
              nom: $("#nom").val(),
              prenom: $("#prenom").val(),
              cadre: $("#cadre").val(),
              grade: $("#grade").val(),
              etablissement: $("#etablissement").val(),
              departement: $("#departement").val(),
              periode_avancement_consideree: $("#periode_avancement_consideree").val(),
              enseignements_cycle: [],
              encadrement_licence: [],
              responsabilite: []
      };

// Récupérer les enseignements
$("#enseignements-licence .dynamic-item").each(function () {
    formData.enseignements_cycle.push({
        annee_universitaire: $(this).find('input[name="annee_universitaire[]"]').val(),
        filiere: $(this).find('input[name="filiere[]"]').val(),
        semestre: $(this).find('input[name="semestre[]"]').val(),
        cours: $(this).find('input[name="cours[]"]').val(),
        td: $(this).find('input[name="td[]"]').val(),
        tp: $(this).find('input[name="tp[]"]').val(),
        vh: $(this).find('input[name="vh[]"]').val(),
        type:"licence"
    });
});

    $("#enseignements-master .dynamic-item").each(function () {
            formData.enseignements_cycle.push({
                annee_universitaire: $(this).find('input[name="annee_universitaire[]"]').val(),
                filiere: $(this).find('input[name="filiere[]"]').val(),
                semestre: $(this).find('input[name="semestre[]"]').val(),
                cours: $(this).find('input[name="cours[]"]').val(),
                td: $(this).find('input[name="td[]"]').val(),
                tp: $(this).find('input[name="tp[]"]').val(),
                vh: $(this).find('input[name="vh[]"]').val(),
                type:"master"
            });
    });

    $("#encadrements-licence .dynamic-item").each(function () {
      formData.encadrement_licence.push({
        annee_universitaire: $(this).find('input[name="annee_universitaire_enc[]"]').val(),
        type_licence: $(this).find('input[name="type_licence[]"]').val(),
        titre_pfe: $(this).find('input[name="titre_pfe[]"]').val(),
        etudiants: $(this).find('input[name="etudiants[]"]').val(),
        nom_encadrants: $(this).find('input[name="nom_encadrants[]"]').val(),
        type:"licence"
       });
   });

    $("#encadrements-master .dynamic-item").each(function () {
        formData.encadrement_licence.push({
            annee_universitaire: $(this).find('input[name="annee_universitaire_enc[]"]').val(),
            type_licence: $(this).find('input[name="type_licence[]"]').val(),
            titre_pfe: $(this).find('input[name="titre_pfe[]"]').val(),
            etudiants: $(this).find('input[name="etudiants[]"]').val(),
            nom_encadrants: $(this).find('input[name="nom_encadrants[]"]').val(),
            type:"master"
        });
    });

    // Récupérer les responsabilités
    $("#responsabilites-licence .dynamic-item").each(function () {
        formData.responsabilite.push({
            annee: $(this).find('input[name="annees_univ[]"]').val(),
            filiere: $(this).find('input[name="filiere[]"]').val(),
            semestre: $(this).find('input[name="semestre[]"]').val(),
            intitule_module: $(this).find('input[name="module[]"]').val(),
            type:"licence"
        });
    });

    $("#responsabilites-master .dynamic-item").each(function () {
        formData.responsabilite.push({
            annee: $(this).find('input[name="annees_univ[]"]').val(),
            filiere: $(this).find('input[name="filiere[]"]').val(),
            semestre: $(this).find('input[name="semestre[]"]').val(),
            intitule_module: $(this).find('input[name="module[]"]').val(),
            type:"master"
        });
    });
   
    console.log("Form Data:", formData);

     
    frappe.call({
        method: "frappe.client.insert",
        args: {
            doc: {
                "doctype": "Enseignant",
                ...formData // Remplacez ceci par les données du formulaire
            }
        },
        callback: function(response) {
            if (response.message) {
                frappe.msgprint('Enseignant ajouté avec succès !');
    
                // Récupération du dernier document créé
                frappe.call({
                    method: 'frappe.client.get_list',
                    args: {
                        doctype: "Enseignant",
                        filters: { owner: frappe.session.user }, // utilisateur actuel
                        fields: ['name'],
                        limit_page_length: 1,
                        order_by: 'creation desc' // dernier enregistrement
                    },
                    callback: function(resp) {
                        if (resp.message && resp.message.length > 0) {
                            let docname = resp.message[0].name;
    
                            // Génération du premier PDF (annexe1)
                            let pdf_url1 = `/api/method/frappe.utils.print_format.download_pdf?doctype=Enseignant&name=${docname}&format=annexe1`;
                            let pdfWindow1 = window.open("http://fsac.com:8000" + pdf_url1, '_blank');
    
                            // Génération du deuxième PDF (annexe2) après une brève attente pour ne pas bloquer le processus
                            setTimeout(() => {
                                let pdf_url2 = `/api/method/frappe.utils.print_format.download_pdf?doctype=Enseignant&name=${docname}&format=annexe2`;
                                let pdfWindow2 = window.open("http://fsac.com:8000" + pdf_url2, '_blank');
                            }, 100); // 100ms d'attente avant l'ouverture du deuxième PDF
    
                        } else {
                            frappe.msgprint('Aucun document récent trouvé.');
                        }
                    }
                });
            } else {
                console.error("Erreur : ", response);
                frappe.show_alert({ message: "Erreur lors de l'ajout de l'enseignant.", indicator: 'red' });
            }
        }
    });
    
});

    
