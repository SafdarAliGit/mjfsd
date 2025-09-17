import frappe
from frappe import _

@frappe.whitelist()
def open_stock_entry(sizing_program_name):
    """Creates a Stock Entry for a given Sizing Program"""
    sp = frappe.get_doc("Sizing Program", sizing_program_name)
    # You will need to define what type of Stock Entry, items, etc.
    # Here's a simplified example

    # Create a new Stock Entry
    se = frappe.new_doc("Stock Entry")
    se.stock_entry_type = "Material Transfer"  # or appropriate type
    # Maybe link back (custom field) to Sizing Program?
    se.append("items", {
        "item_code": "ABC-ITEM",  # or from sp
        "qty": 1,
        "s_warehouse": "",
        "t_warehouse": ""
    })
    # If you want set other fields
    # se.save()
    # Optionally submit or leave draft
    # se.submit()

    return se
