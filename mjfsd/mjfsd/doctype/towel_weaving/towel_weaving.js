// Copyright (c) 2024, Tech Ventures and contributors
// For license information, please see license.txt

frappe.ui.form.on('Towel Weaving', {
    // Uncomment if needed for refreshing the form
    // refresh: function(frm) {

    // }
    width: function (frm) {
        quality_weaving(frm);
    },
    length: function (frm) {
        quality_weaving(frm);
    },
    gsm: function (frm) {
        quality_weaving(frm);
    },
    add_percentage: function (frm) {
        quality_weaving(frm);
    },
    thread_type: function (frm) {
        weft_consumption(frm);
    },

    weft_count: function (frm) {
        weft_consumption(frm);
        hem_consumption(frm);
    },
    pick: function (frm) {
        weft_consumption(frm);
    },
    percentage_add: function (frm) {
        weft_consumption(frm);
    },
    read: function (frm) {
        ground_consumption(frm);
    },
    cut: function (frm) {
        ground_consumption(frm);
    },
    kinar: function (frm) {
        ground_consumption(frm);
    },
    yarn: function (frm) {
        ground_consumption(frm);
    },
    yarn_count: function (frm) {
        ground_consumption(frm);
    },
    add_percentage_first: function (frm) {
        ground_consumption(frm);
    },
    add_percentage_second: function (frm) {
        ground_consumption(frm);
    },
    hem_count: function (frm) {
        hem_consumption(frm);
    },
    add_percentage_third: function (frm) {
        hem_consumption(frm);
    }
});

function quality_weaving(frm) {
    let width = parseFloat(frm.doc.width) || 1;
    let height = parseFloat(frm.doc.length) || 1;
    let gsm = parseFloat(frm.doc.gsm) || 1;
    let add_percentage = parseFloat(frm.doc.add_percentage) || 0;
    const c = 10000;
    let quality_weight = (width * height * gsm) / c;
    let percentage = quality_weight * (add_percentage / 100);
    let total_quality_weight = quality_weight + percentage;
    frm.set_value("quality_weight", total_quality_weight);

}

function weft_consumption(frm) {
    let width = parseFloat(frm.doc.width) || 1;
    let height = parseFloat(frm.doc.length) || 1;
    let thread_type = frm.doc.thread_type || '';
    let weft_thread = parseFloat(frm.doc.weft_thread) || 1;
    let reduction = parseFloat(frm.doc.reduction) || 1;
    let weft_count = parseFloat(frm.doc.weft_count) || 1;
    let pick = parseFloat(frm.doc.pick) || 0;
    let percentage_add = parseFloat(frm.doc.percentage_add) || 1;
    let quality_weight = parseFloat(frm.doc.quality_weight) || 1;

    let pick_by_width = (pick * width) / 2.54;
    let pick_by_width_with_percentage = pick_by_width + (pick_by_width * (percentage_add / 100));

    let total_weft = (((((pick_by_width_with_percentage * height) / 100) / 768) / weft_count) / 2.2046) * 1000;
    let consumption_percentage = (total_weft / quality_weight) * 100;

    frm.set_value("total_weft", total_weft);
    frm.set_value("consumption_percentage", consumption_percentage);
}

function ground_consumption(frm) {
    // Parse form values and set defaults
    let width = parseFloat(frm.doc.width) || 1;
    let read = parseFloat(frm.doc.read) || 1;
    let kinar = parseFloat(frm.doc.kinar) || 0;
    let cut = parseFloat(frm.doc.cut) || 0;
    let length = parseFloat(frm.doc.length) || 1;
    let yarn_count = parseFloat(frm.doc.yarn_count) || 1;
    let thread_type = frm.doc.ground_thread_type || '';
    let add_percentage_first = parseFloat(frm.doc.add_percentage_first) || 1;
    let add_percentage_second = parseFloat(frm.doc.add_percentage_second) || 1;
    let quality_weight = parseFloat(frm.doc.quality_weight) || 1;

    // Calculate width by read with adjustments for percentage, kinar, and cut
    let width_by_read = (width / 2.54) * (read / 2);
    let width_by_read_with_percentage = width_by_read + (width_by_read * (add_percentage_first / 100));
    let width_by_read_with_kinar_and_cut = (width_by_read_with_percentage + kinar + cut) * length;
    let width_by_read_with_kinar_and_cut_with_percentage = width_by_read_with_kinar_and_cut + (width_by_read_with_kinar_and_cut * (add_percentage_second / 100));

    // Ensure yarn_count and quality_weight are non-zero to avoid division by zero
    if (yarn_count === 0) {
        yarn_count = 1;
        console.warn("yarn_count was zero, defaulted to 1 to avoid division by zero.");
    }
    if (quality_weight === 0) {
        quality_weight = 1;
        console.warn("quality_weight was zero, defaulted to 1 to avoid division by zero.");
    }

    // Calculate total ground and ground consumption percentage
    let total_ground = (((width_by_read_with_kinar_and_cut_with_percentage / 768) / yarn_count) / 2.2046) / 100;
    let ground_consumption_percentage = (total_ground / quality_weight) * 100000;

    // Set values in form
    frm.set_value("total_ground", total_ground);
    frm.set_value("ground_consumption_percentage", ground_consumption_percentage);
}

function hem_consumption(frm) {
    let hem_count = parseFloat(frm.doc.hem_count) || 1;
    let add_percentage_third = parseFloat(frm.doc.add_percentage_third) || 1;
    let weft_count = parseFloat(frm.doc.weft_count) || 1;
    let quality_weight = parseFloat(frm.doc.quality_weight) || 1;

    if (quality_weight === 0) {
        quality_weight = 1;
        console.warn("quality_weight was zero, defaulted to 1 to avoid division by zero.");
    }

    let one_twenty_seven_by_hundred = (127 * 100) / 2.54;
    let one_twenty_seven_by_hundred_percentage = one_twenty_seven_by_hundred + (one_twenty_seven_by_hundred * (add_percentage_third / 100));
    let total_hem = (((((one_twenty_seven_by_hundred_percentage * 4.5) / 100) / 768 ) / weft_count) / 2.2046) * hem_count;
    let hem_consumption_percentage = (total_hem / quality_weight) * 100000;
    // Set values in form
    frm.set_value("total_hem", total_hem);
    frm.set_value("hem_consumption_percentage", hem_consumption_percentage);
}
