import frappe
from frappe.model.document import Document

@frappe.whitelist()
def create_stock_entry_from_sizing_program(sizing_program):
    # Fetch the Weaving Contract document
    sp = frappe.get_doc("Sizing Program", sizing_program)
    se = frappe.db.get_value("Stock Entry", {"sizing_program": sizing_program}, "name")
    se_doc = None
    if se:
        se_doc = frappe.get_doc("Stock Entry", se)
    if se_doc and se_doc.docstatus != 2:
        frappe.throw(f"Stock Entry already created for {weaving_contract} Weaving Contract")
    # Create a new Stock Entry
    stock_entry = frappe.new_doc("Stock Entry")
    stock_entry.stock_entry_type = "Manufacture"  # Change as needed
    stock_entry.purpose = "Manufacture"
    stock_entry.sizing_program = sizing_program  # Link back to Weaving Contract

    # Loop through child items (bom_items) and add them to Stock Entry items

    stock_entry.append("items", {
        "item_code": sp.item,
        "qty": sp.lbs,
        "allow_zero_valuation_rate": 1,
        "s_warehouse": sp.source_warehouse,
        "uom": sp.uom,
        "stock_uom": sp.uom
    })
    stock_entry.append("items", {
        "item_code": sp.item_returnable,
        "qty": sp.lbs,
        "allow_zero_valuation_rate": 1,
        "is_finished_item": 1,
        "uom": sp.uom,
        "stock_uom": sp.uom
    })

    # Return the Stock Entry name to open in the form view
    return stock_entry

