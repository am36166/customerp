# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Responsabilites(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		annee: DF.Data | None
		filiere: DF.Data | None
		intitule_module: DF.Data | None
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		semestre: DF.Data | None
		type: DF.Data | None
	# end: auto-generated types
	pass