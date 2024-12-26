import frappe
from frappe import _
@frappe.whitelist(allow_guest=True)
def get_notifications():
    # Assume 'Coordinator Notification' est un Doctype qui stocke les notifications
    notifications = frappe.get_all('Coordinator Notification', fields=['title', 'message'])
    return notifications


@frappe.whitelist(allow_guest=True)
def notify_coordinator_on_insert(title, message):
    notification = frappe.new_doc("Coordinator Notification")
    notification.title = title
    notification.message = message
    notification.insert()
    frappe.db.commit()
    return {"status": "success"}

