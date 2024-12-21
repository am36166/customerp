frappe.ready(function () {
    frappe.web_form.after_save = () => {
        let actual_doctype = 'Enseignant'; 

        // all Enseignant    
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: actual_doctype,
                filters: { owner: frappe.session.user }, // current user
                fields: ['name'],
                limit_page_length: 1,
                order_by: 'creation desc' // last record
            },
            callback: function (response) {
                if (response.message && response.message.length > 0) {
                    let docname = response.message[0].name;

                    // Api for genrating pdf (frappe backend)
                    let pdf_url = `/api/method/frappe.utils.print_format.download_pdf?doctype=${actual_doctype}&name=${docname}&format=fiche enseignant`;

                    // pdf on a new tab
                    window.open(pdf_url, '_blank');
                } else {
                    frappe.msgprint('Aucun document récent trouvé.');
                }
            }
        });
    };
});
