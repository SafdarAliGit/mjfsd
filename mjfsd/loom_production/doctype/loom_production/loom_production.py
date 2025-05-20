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
				rpm = float(row.rpm)
				unit_per_rpm = round((rpm * (0.72 / 12)) * shift_hours)
				row.unit_per_rpm = unit_per_rpm

				actual_reading = float(row.actual_reading or 0)
				if unit_per_rpm:
					row.effeciency = int((actual_reading / unit_per_rpm) * 100)
				else:
					row.effeciency = 0
			except (TypeError, ValueError):
				row.unit_per_rpm = 0
				row.effeciency = 0


		
