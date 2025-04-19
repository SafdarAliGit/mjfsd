import frappe
import json
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




import frappe
import json
from frappe import _
from frappe.model.document import Document

@frappe.whitelist()
def make_stock_entry_from_sizing_item(docname,s_warehouse, child_row):
    try:
        child_row = json.loads(child_row)

        sizing_program = frappe.get_doc("Sizing Program", docname)

        # Create Batch for finished item
        batch = frappe.new_doc("Batch")
        batch.batch_id = str(child_row.get("set_no")) 
        batch.item = child_row.get("item")
        batch.stock_uom = "Meter"
        batch.ends = child_row.get("ends")
        batch.yarn_count = child_row.get("yarn_count")
        batch.save(ignore_permissions=True)

        # Create Stock Entry
        se = frappe.new_doc("Stock Entry")
        se.stock_entry_type = "Repack"
        se.purpose = "Repack"
        se.set_posting_time = 1
        se.posting_date = sizing_program.date
        se.sizing_program = sizing_program.name

        # Raw Material Entry (source)
        se.append("items", {
            "item_code": child_row.get("yarn_item"),
            "qty": child_row.get("lbs"),
            "uom":"Lbs",
            "s_warehouse": s_warehouse,
            "conversion_factor": 1
        })

        # Finished Item Entry (target)
        se.append("items", {
            "item_code": child_row.get("item"),
            "qty": child_row.get("length"),
            "uom": "Meter",
            "t_warehouse": child_row.get("target_warehouse"),
            "batch_no": batch.name,
            "allow_zero_valuation_rate": 1
        })

        se.save(ignore_permissions=True)
        se.submit()

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Error in make_stock_entry_from_sizing_item")
        frappe.throw(_("Failed to create Stock Entry. Error: {0}").format(str(e)))

