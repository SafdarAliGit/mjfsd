import frappe

@frappe.whitelist()
def fetch_current_rate(item_code, warehouse):
    try:    
        result = frappe.db.sql(
                """
                SELECT valuation_rate as rate
                FROM `tabStock Ledger Entry`
                WHERE item_code = %s AND warehouse = %s AND is_cancelled = 0
                ORDER BY posting_date DESC, posting_time DESC
                LIMIT 1
                """,
                (item_code, warehouse),
                as_dict=True
            )   
        if result:
            return result[0].rate
        else:
            return None

    except Exception:
        frappe.log_error(frappe.get_traceback(), "Error in fetching rate")
        return None