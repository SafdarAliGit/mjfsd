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
                    ["Item", "item_group", "in", ["Beam"]]
                ]
            };
        });
    }
})

frappe.ui.form.on('Loom Production Items', {
    rpm: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var unit_per_rpm = Math.floor(d.rpm* (0.72/ 12) * 7);
        frappe.model.set_value(cdt, cdn, "unit_per_rpm", unit_per_rpm);
    },

    end_reading: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var actual_reading = d.end_reading - d.start_reading;
        frappe.model.set_value(cdt, cdn, "actual_reading", actual_reading);
        var effeciency = Math.floor((actual_reading/d.unit_per_rpm)*100);
        frappe.model.set_value(cdt, cdn, "effeciency", effeciency);
    },



});



