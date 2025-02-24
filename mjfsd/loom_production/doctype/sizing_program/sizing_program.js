// Copyright (c) 2023, Tech Ventures and contributors
// For license information, please see license.txt

$(document).ready(function () {
    $('input[data-fieldname="po_number"], input[data-fieldname="date"],' +
        'input[data-fieldname="supplier"],input[data-fieldname="item"],select[data-fieldname="quality"],' +
        'input[data-fieldname="yarn_count"],input[data-fieldname="lbs_per_bag"],input[data-fieldname="cones_per_bag"],' +
        'input[data-fieldname="warping_beam"],input[data-fieldname="sizing_beam"],input[data-fieldname="warp_wastage_percent"],' +
        'input[data-fieldname="beam_size"],input[data-fieldname="ends"],input[data-fieldname="bags_issue"],' +
        'input[data-fieldname="no_of_bags_required"],input[data-fieldname="item_returnable"],input[data-fieldname="fabric_construction"]')
        .css("background-color", "#FFE4C4");

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


});


frappe.ui.form.on("Sizing Program", {
    refresh(frm) {
        frm.set_query("item_returnable", function () {
            return {
                "filters": {
                    "item_group": "Beam"
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
