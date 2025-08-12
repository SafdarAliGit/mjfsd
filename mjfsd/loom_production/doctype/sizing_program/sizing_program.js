// Copyright (c) 2023, Tech Ventures and contributors
// For license information, please see license.txt

$(document).ready(function () {
    $('input[data-fieldname="po_number"], input[data-fieldname="date"],' +
        'input[data-fieldname="supplier"],input[data-fieldname="item"],select[data-fieldname="quality"],' +
        'input[data-fieldname="yarn_count"],input[data-fieldname="lbs_per_bag"],input[data-fieldname="cones_per_bag"],' +
        'input[data-fieldname="warping_beam"],input[data-fieldname="sizing_beam"],input[data-fieldname="warp_wastage_percent"],' +
        'input[data-fieldname="beam_size"],input[data-fieldname="ends"],input[data-fieldname="bags_issue"],' +
        'input[data-fieldname="no_of_bags_required"],input[data-fieldname="item_returnable"],input[data-fieldname="fabric_construction"],' +
        'input[data-fieldname="lbs_issue"],input[data-fieldname="panna"]').css("background-color", "#FFE4C4");

    $('input[data-fieldname="po_number"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="po_number"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="date"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="date"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="supplier"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="supplier"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="item"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="item"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('select[data-fieldname="quality"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('select[data-fieldname="quality"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="yarn_count"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="yarn_count"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="lbs_per_bag"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="lbs_per_bag"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="cones_per_bag"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="cones_per_bag"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="warping_beam"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="warping_beam"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="sizing_beam"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="sizing_beam"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="warp_wastage_percent"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="warp_wastage_percent"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="beam_size"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="beam_size"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });

      $('input[data-fieldname="ends"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="ends"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
      $('input[data-fieldname="bags_issue"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="bags_issue"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
      $('input[data-fieldname="no_of_bags_required"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="no_of_bags_required"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
      $('input[data-fieldname="item_returnable"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="item_returnable"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="fabric_construction"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="fabric_construction"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="panna"]').focus(function () {
        $(this).css("background-color", "#50C878");
    });
    $('input[data-fieldname="panna"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });
    $('input[data-fieldname="lbs_issue"]').blur(function () {
        $(this).css("background-color", "#FFE4C4");
    });

});


frappe.ui.form.on("Sizing Program", {
    
    refresh(frm) {
    
        if (!frm.is_new()) {
            frm.set_value('po_number', frm.doc.name);
        }
        frm.set_query("item_returnable", function () {
            return {
                "filters": {
                    "item_group": "Beam"
                }
            }
        });
        frm.set_query("fabric_construction", function () {
            return {
                "filters": {
                    "item_group": "Fabric"
                }
            }
        });
        frm.set_query("item", function () {
            return {
                "filters": {
                    "item_group": "Yarn"
                }
            }
        });
        frm.set_query("item","items", function () {
            return {
                "filters": {
                    "item_group": "Beam"
                }
            }
        });
        frm.set_query("yarn_item","stock_return_item", function () {
            return {
                "filters": {
                    "item_group": "Yarn"
                }
            }
        });
        frm.set_query("fabric_construction","fabric_construction_detail", function () {
            return {
                "filters": {
                    "item_group": "Fabric"
                }
            }
        });
        if (frm.doc.docstatus == 1) {
            frm.add_custom_button(__('Stock Entry'), function() {
                frappe.call({
                    method: "mjfsd.loom_production.events.create_stock_entry_from_sizing_program.create_stock_entry_from_sizing_program",
                    args: {
                        sizing_program: frm.doc.name
                    },
                    callback: function(r) {
                        if (!r.exc) {
							frappe.model.sync(r.message);
							frappe.set_route("Form", r.message.doctype, r.message.name);
						}
                    }
                });
            }).css('background-color', '#ff9800').css('color', '#ffffff','font-weight','bold');
		}
        if (frm.doc.docstatus == 1) {
            
            frm.add_custom_button(__('Stock Return Entry'), function() {
                frappe.call({
                    method: "mjfsd.loom_production.events.create_stock_entry_from_sizing_program.make_stock_entry_for_stock_return_item",
                    args: {
                        sizing_program: frm.doc.name,
                    },
                    callback: function(r) {
                        if (!r.exc) {
							frappe.model.sync(r.message);
							frappe.set_route("Form", r.message.doctype, r.message.name);
						}
                    }
                });
            }).css('background-color', '#527DF3').css('color', '#ffffff','font-weight','bold');
		}
    
    
    },
    fabric_construction:function(frm){
        to_child(frm);
    },
    panna:function(frm){
        to_child(frm);
    },
    lbs_issue:function(frm){
        calculate_cones_per_bag(frm);
    },
    bags_issue:function(frm){
        calculate_cones_per_bag(frm);
    },
    ends: function (frm) {
        var cones_per_bag = frm.doc.cones_per_bag;
        var lbs_per_bag = frm.doc.lbs_per_bag;
        var cone_weight = lbs_per_bag / cones_per_bag;
        frm.set_value('cone_weight', cone_weight);

        var yarn_count = frm.doc.yarn_count;
        var meter = yarn_count * 768.1 * cone_weight;
        frm.set_value('meter', meter);

        var warp_wastage_percent = frm.doc.warp_wastage_percent;
        var wastage = meter * (warp_wastage_percent / 100);
        var net_meter = meter - wastage;
        frm.set_value('wastage', wastage);
        frm.set_value('net_meter', net_meter);

        var warping_beam = frm.doc.warping_beam;
        var meter_warp_per_beam = net_meter / warping_beam;
        frm.set_value('meter_warp_per_beam', meter_warp_per_beam);

        var sizing_beam = frm.doc.sizing_beam;
        var meter_sizing_beam = meter_warp_per_beam / sizing_beam;
        frm.set_value('meter_sizing_beam', meter_sizing_beam);

        var ends = frm.doc.ends;
        var no_of_bags_required = (ends / cones_per_bag) / warping_beam;
        frm.set_value('no_of_bags_required', no_of_bags_required);

        var yarn_consumption_per_meter = (ends/ 768.1) / yarn_count;
     
        frm.set_value('yarn_consumption_per_meter',yarn_consumption_per_meter);

        var lbs_per_sizing_beam = meter_sizing_beam * sizing_beam;
        frm.set_value('lbs_per_sizing_beam',lbs_per_sizing_beam);

        var lbs = frm.doc.lbs;
        var lbs_consumed = yarn_consumption_per_meter *lbs_per_sizing_beam;
        frm.set_value('lbs_consumed',lbs_consumed);

        var lbs_returnable = lbs - lbs_consumed;
        frm.set_value('lbs_returnable',lbs_returnable);



    },
    warp_wastage_percent: function (frm) {
        var cones_per_bag = frm.doc.cones_per_bag;
        var lbs_per_bag = frm.doc.lbs_per_bag;
        var cone_weight = lbs_per_bag / cones_per_bag;
        frm.set_value('cone_weight', cone_weight);

        var yarn_count = frm.doc.yarn_count;
        var meter = yarn_count * 768.1 * cone_weight;
        frm.set_value('meter', meter);

        var warp_wastage_percent = frm.doc.warp_wastage_percent;
        var wastage = meter * (warp_wastage_percent / 100);
        var net_meter = meter - wastage;
        frm.set_value('wastage', wastage);
        frm.set_value('net_meter', net_meter);

        var warping_beam = frm.doc.warping_beam;
        var meter_warp_per_beam = net_meter / warping_beam;
        frm.set_value('meter_warp_per_beam', meter_warp_per_beam);

        var sizing_beam = frm.doc.sizing_beam;
        var meter_sizing_beam = meter_warp_per_beam / sizing_beam;
        frm.set_value('meter_sizing_beam', meter_sizing_beam);

        var ends = frm.doc.ends;
        var no_of_bags_required = (ends / cones_per_bag) / warping_beam;
        frm.set_value('no_of_bags_required', no_of_bags_required);

        var yarn_consumption_per_meter = (ends / 768.1)/yarn_count;
        frm.set_value('yarn_consumption_per_meter',yarn_consumption_per_meter);
        var lbs_per_sizing_beam = meter_sizing_beam * sizing_beam;
        frm.set_value('lbs_per_sizing_beam',lbs_per_sizing_beam);

        var lbs = frm.doc.lbs;
         var lbs_consumed = yarn_consumption_per_meter *lbs_per_sizing_beam;
        frm.set_value('lbs_consumed',lbs_consumed);

        var lbs_returnable = lbs - lbs_consumed;
        frm.set_value('lbs_returnable',lbs_returnable);
    },
    bags_issue: function (frm) {
        var bags_issue = frm.doc.bags_issue;
        var lbs_per_bag = frm.doc.lbs_per_bag;
        var lbs = lbs_per_bag * bags_issue;
        frm.set_value('lbs', lbs);

        var yarn_consumption_per_meter = (frm.doc.ends / 768.1)/frm.doc.yarn_count;
        frm.set_value('yarn_consumption_per_meter',yarn_consumption_per_meter);

        var lbs_per_sizing_beam = frm.doc.meter_sizing_beam * frm.doc.sizing_beam;
        frm.set_value('lbs_per_sizing_beam',lbs_per_sizing_beam);

        var lbs_consumed = yarn_consumption_per_meter *lbs_per_sizing_beam;
        frm.set_value('lbs_consumed',lbs_consumed);

        var lbs_returnable = lbs - lbs_consumed;
        frm.set_value('lbs_returnable',lbs_returnable);
    }
});

frappe.ui.form.on('Sizing Program Item', {
    form_render: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];

      
            frappe.model.set_value(cdt, cdn, "sizing_name", frm.doc.supplier);
      
    
            frappe.model.set_value(cdt, cdn, "yarn_count", frm.doc.yarn_count);
      
      
            frappe.model.set_value(cdt, cdn, "yarn_item", frm.doc.item);
        
    },
    ends: function(frm, cdt, cdn) {
        calculate_value_from_ends(frm, cdt, cdn);
        calculate_warp_weight(frm, cdt, cdn)
    },
    yarn_count: function(frm, cdt, cdn) {
        calculate_warp_weight(frm, cdt, cdn)
        calculate_value_from_ends(frm, cdt, cdn);
    },
    wastage_percentage: function(frm, cdt, cdn) {
        calculate_warp_weight(frm, cdt, cdn);
        set_rate(frm, cdt, cdn);
        calculate_value_from_ends(frm, cdt, cdn);
    },
    no_of_width: function(frm, cdt, cdn) {
        calculate_warp_weight(frm, cdt, cdn);
        calculate_value_from_ends(frm, cdt, cdn);
    },
        
    length: function(frm, cdt, cdn) {
        calculate_total_yarn_consumption(frm, cdt, cdn);
    },
    make_stock_entry: function(frm, cdt, cdn) {
        make_stock_entry(frm, cdt, cdn);
    },
    items_add:function(frm){
        to_child(frm);
    },
    yarn_item:function(frm, cdt, cdn){
        set_rate(frm, cdt, cdn);
    }
});

frappe.ui.form.on('Sizing Program Stock Return Item',{
    qty_lbs: function(frm, cdt, cdn) {
        update_total_yarn_return(frm);
    },
    stock_return_item_remove:function(frm,cdt,cdn){
        update_total_yarn_return(frm);
    }
});

function update_total_yarn_return(frm) {
    let total = 0;
    let lbs_issue = frm.doc.lbs_issue;
    frm.doc.stock_return_item.forEach(function(row) {
        total += flt(row.qty_lbs);
    });
    frm.set_value('total_yarn_return', total);
    frm.set_value('balance_yarn',lbs_issue - total);
}

function calculate_value_from_ends(frm, cdt, cdn) {
    let row = locals[cdt][cdn];

    if (row.ends && row.yarn_count) {
        let result = (row.ends/row.no_of_width / 768.1) / row.yarn_count;
        frappe.model.set_value(cdt, cdn, 'yarn_consumption_per_meter', result.toFixed(5));
    } else {
        frappe.model.set_value(cdt, cdn, 'yarn_consumption_per_meter', 0);
    }
}

function calculate_total_yarn_consumption(frm, cdt, cdn) {
    let row = locals[cdt][cdn];

    if (row.warp_weight && row.length) {
        let total = row.warp_weight * row.length;
        frappe.model.set_value(cdt, cdn, 'lbs', total.toFixed(4));
        let beem_rate_per_meter = (total.toFixed(4) * row.yarn_item_rate)/row.length;
        frappe.model.set_value(cdt, cdn, 'beem_rate_per_meter', beem_rate_per_meter.toFixed(4));
    } else {
        frappe.model.set_value(cdt, cdn, 'lbs', 0);
        frappe.model.set_value(cdt, cdn, 'beem_rate_per_meter', 0);
    }
}

function make_stock_entry(frm, cdt, cdn) {
    const row = locals[cdt][cdn];

    frappe.call({
        method: "mjfsd.loom_production.events.create_stock_entry_from_sizing_program.make_stock_entry_from_sizing_item",
        args: {
            docname: frm.doc.name,
            s_warehouse: frm.doc.source_warehouse,
            child_row: row
        },
        callback: function (r) {
            if (!r.exc && r.message) {
                frappe.msgprint(__('Stock Entry Created: <a href="/app/stock-entry/' + r.message + '" target="_blank">' + r.message + '</a>'));
            }
        }
    });
}


function calculate_cones_per_bag(frm) {
    const bags_issue = frm.doc.bags_issue;
    const lbs_issue = frm.doc.lbs_issue;

    // Ensure both values are numbers and bags_issue is not zero
    if (bags_issue && lbs_issue && bags_issue !== 0) {
        const cones = lbs_issue / bags_issue;
        frm.set_value('cones_per_bag', cones);
    } else {
        // Set to 0 or handle as per your application's requirements
        frm.set_value('cones_per_bag', 0);
    }
}

function to_child(frm) {

    const fabric_construction = frm.doc.fabric_construction;
    const panna = frm.doc.panna
    if(frm.doc.items.length > 0){
        if(fabric_construction && panna){
            frm.doc.items.forEach(row => {
                frappe.model.set_value(row.doctype, row.name, "fabric_construction", fabric_construction);
                frappe.model.set_value(row.doctype, row.name, "panna", panna);
              });
            frm.refresh_field("items");
        }else{
            frappe.msgprint(__('Please select Fabric Construction and Panna'));
        }
    }
}

function calculate_warp_weight(frm, cdt, cdn){
    let row = locals[cdt][cdn];
    const ends = row.ends;
    const no_of_width = row.no_of_width;
    const yarn_count = row.yarn_count;
    const wastage_percentage = row.wastage_percentage;
    if(ends && yarn_count && wastage_percentage){
    const warp_wt = ends/no_of_width / 768.10 / yarn_count;
    const warp_weight = warp_wt + (warp_wt * (wastage_percentage/100));
    frappe.model.set_value(cdt, cdn, 'warp_weight', warp_weight);
    }else{
        frappe.model.set_value(cdt, cdn, 'warp_weight', 0);
    }
}

function set_rate(frm, cdt, cdn) {
    const row = locals[cdt][cdn];
    const source_warehouse = frm.doc.source_warehouse;
    if (row.yarn_item && source_warehouse) {
      frappe.call({
        method: 'mjfsd.loom_production.events.fetch_current_rate.fetch_current_rate',
        args: {
          item_code: row.yarn_item,
          warehouse: source_warehouse
        },
        callback: (r) => {
          if (!r.exc && r.message !== undefined) {
            frappe.model.set_value(cdt, cdn, 'yarn_item_rate', r.message);
            frappe.model.set_value(cdt, cdn, 'beem_rate', r.message * row.warp_weight);
          }
        }
      });
    }
  }
  