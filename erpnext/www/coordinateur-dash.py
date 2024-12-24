import frappe
from erpnext.auth import check_role_access

def get_context(context):
    check_role_access()
    context.title = "Page coordinateur"
    return context