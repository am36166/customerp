import frappe
from functools import wraps

def check_auth_and_role(role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            if not frappe.session.user or frappe.session.user == 'Guest':
                frappe.local.flags.redirect_location = '/login-custom'
                raise frappe.Redirect

            if role not in frappe.get_roles(frappe.session.user):
                frappe.local.flags.redirect_location = '/permission-denied'
                raise frappe.Redirect

            return fn(context=frappe._dict(), *args, **kwargs) # context=frappe._dict() is a dummy context
        return wrapper
    return decorator
