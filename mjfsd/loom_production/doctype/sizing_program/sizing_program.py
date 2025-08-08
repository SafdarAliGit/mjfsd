import frappe
from frappe import _
from frappe.model.document import Document

class SizingProgram(Document):
	def on_submit(self):
		if self.stock_return_item and len(self.stock_return_item) > 0:
			self.make_stock_entry_for_stock_return_item()

	def make_stock_entry_for_stock_return_item(self):
		try:
			se = frappe.new_doc("Stock Entry")
			se.stock_entry_type = "Material Transfer"
			se.purpose = "Material Transfer"
			se.set_posting_time = 1
			se.posting_date = self.date
			se.custom_sizing_program_stock_entry = self.name

			for row in self.stock_return_item:
				se.append("items", {
					"item_code": row.yarn_item,
					"qty": row.qty_lbs,
					"uom": "Lbs",
					"s_warehouse": self.source_warehouse,
					"t_warehouse": row.target_warehouse,
					"conversion_factor": 1,
					"stock_uom": "Lbs"
				})

			se.save()
			se.submit()

		except Exception as e:
			frappe.log_error(frappe.get_traceback(), "Error in make_stock_entry_for_stock_return_item")
			frappe.throw(_("Failed to create Stock Entry. Error: {0}").format(str(e)))
