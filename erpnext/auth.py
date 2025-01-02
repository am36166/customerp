import frappe
from frappe.auth import LoginManager
from frappe.sessions import clear_sessions
from frappe.auth import HTTPRequest
from frappe import _
from werkzeug.wrappers import Response
from werkzeug.utils import redirect

@frappe.whitelist(allow_guest=True)
def authenticate(usr, pwd):
    try:
        # Initialiser le gestionnaire de connexion
        login_manager = LoginManager()
        login_manager.authenticate(usr, pwd)
        login_manager.post_login()

        # Obtenir les rôles de l'utilisateur
        roles = frappe.get_roles(usr)  # Obtenir les rôles spécifiques de l'utilisateur
        print(f"Authenticating {usr} with roles: {roles}")

        # Priorité stricte pour l'administrateur
        if usr == "Administrator":
            redirect_url = "/app"
        elif "Enseignant" in roles:
            redirect_url = "/enseignantannexes"
        elif "Coordinateur" in roles:
            redirect_url = "/coordinateurpage"
        elif "Membre Commission" in roles:
            redirect_url = "/commission-dash"
        else:
            redirect_url = "/"

        print(f"Redirect URL selected for {usr}: {redirect_url}")

        return {
            "success": True,
            "redirect_url": redirect_url
        }

    except frappe.AuthenticationError:
        return {
            "success": False,
            "message": _("Authentication Failed")
        }


@frappe.whitelist(allow_guest=True)
def logout():
    try:
        clear_sessions(user=frappe.session.user, keep_current=True, force=True)

        return {
            "success": True,
            "redirect_url": "/login-custom"
        }
    except Exception as e:
        frappe.logger().error(f"Logout error: {str(e)}")
        return {
            "success": False,
            "message": _("Error during logout")
        }


