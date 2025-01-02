import frappe
from frappe import _
from erpnext.midlware import check_auth_and_role

@check_auth_and_role("Enseignant")
def get_context(context):
    print(f"User: {frappe.session.user}, Roles: {frappe.get_roles(frappe.session.user)}")
    context.no_cache = 1
    context.title = _("Enseignement")
    return context

