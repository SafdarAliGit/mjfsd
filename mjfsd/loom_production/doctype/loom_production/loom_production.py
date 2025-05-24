# Copyright (c) 2023, Tech Ventures and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class LoomProduction(Document):
    def before_save(self):
        try:
            shift_hours = float(self.shift_working_hours)
        except (TypeError, ValueError):
            shift_hours = 0

        for row in self.loom_production_items:
            try:
                rpm = float(row.rpm or 0)
                constant = float(row.constant or 0)
                pick = float(row.pick or 1)  # prevent division by zero
                panna = float(row.panna or 0)
                actual_reading = float(row.actual_reading or 0)

                # unit_per_rpm calculation
                unit_per_rpm = round((rpm * (0.72 / 12)) * shift_hours)
                row.unit_per_rpm = unit_per_rpm

                # efficiency calculation
                if unit_per_rpm > 0:
                    row.effeciency = int((actual_reading / unit_per_rpm) * 100)
                else:
                    row.effeciency = 0

                # meters calculation
                row.meters = ((actual_reading * constant) / pick) * panna

            except (TypeError, ValueError):
                row.unit_per_rpm = 0
                row.effeciency = 0
                row.meters = 0



		
