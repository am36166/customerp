import frappe
from frappe.auth import LoginManager
from frappe import _

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
            redirect_url = "/enseignant-dash"
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


def check_role_access():
    """Rediriger les utilisateurs vers des pages spécifiques en fonction de leurs rôles"""
    if not frappe.session.user or frappe.session.user == 'Guest':
        frappe.local.flags.redirect_location = '/login-custom'
        raise frappe.Redirect

    current_path = frappe.request.path
    print(f"Accessing path: {current_path}")
    roles = frappe.get_roles(frappe.session.user)  # Utiliser l'utilisateur de la session

    # Définir les chemins d'accès et leurs rôles requis
    role_paths = {
        "/enseignant-dash": "Enseignant",
        "/coordinateurpage": "Coordinateur",
        "/commission-dash": "Membre Commission",
        "/app": "Administrator"
    }

    # Vérifier si l'utilisateur a accès à la page demandée
    if current_path in role_paths:
        required_role = role_paths[current_path]
        print(f"Required role for path {current_path}: {required_role}")
        if required_role not in roles:
            frappe.local.flags.redirect_location = '/login-custom'
            raise frappe.Redirect
