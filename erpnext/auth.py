import frappe
from frappe.auth import LoginManager
from frappe.utils import cint
from frappe import _

@frappe.whitelist(allow_guest=True)
def authenticate(usr, pwd):
    try:
        login_manager = LoginManager()
        login_manager.authenticate(usr, pwd)
        login_manager.post_login()
        
        roles = frappe.get_roles()
        print(roles)
        
        #redirect user based on role
        redirect_url = "/"
        if "Enseignant" in roles:
            redirect_url = "/enseignant-dash"
        elif "Coordinateur" in roles:
            redirect_url = "/coordinateur-dash"
        elif "Membre Commission" in roles:
            redirect_url = "/commission-dash"
            
        return {
            "success": True,
            "redirect_url": redirect_url
        }
        
    except frappe.AuthenticationError:
        return {
            "success": False,
            "message": _("Authentication Failed")
        }

def check_role_access():
    """same as frappe.auth.check_role_access, but redirects to custom login page"""
    if not frappe.session.user or frappe.session.user == 'Guest':
        frappe.local.flags.redirect_location = '/login-custom'
        raise frappe.Redirect
        
    current_path = frappe.request.path
    print(current_path)
    roles = frappe.get_roles()
    
    role_paths = {
        "/enseignant-dash": "Enseignant",
        "/coordinateur-dash": "Coordinateur",
        "/commission-dash": "Membre Commission"
    }
    
    if current_path in role_paths:
        required_role = role_paths[current_path]
        if required_role not in roles:
            frappe.local.flags.redirect_location = '/login-custom'
            raise frappe.Redirect