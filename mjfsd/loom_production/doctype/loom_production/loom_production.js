// Copyright (c) 2023, Tech Ventures and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Loom Production", {
// 	refresh(frm) {
//
// 	},
// });


frappe.ui.form.on('Loom Production', {
    refresh(frm) {
        
        frm.set_query('sizing_name', 'loom_production_items', function (doc, cdt, cdn) {
            return {
                filters: [
                    ["Item", "item_group", "in", ["Fabric"]]
                ]
            };
        });
    }
})

frappe.ui.form.on('Loom Production Items', {
    actual_reading: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var unit_per_rpm = Math.round((d.rpm* (0.72/ 12) * frm.doc.shift_working_hours),0);
        frappe.model.set_value(cdt, cdn, "unit_per_rpm", unit_per_rpm);
        var actual_reading = d.actual_reading;
        var effeciency = Math.floor((actual_reading/unit_per_rpm)*100);
        frappe.model.set_value(cdt, cdn, "effeciency", effeciency);
    },



});



