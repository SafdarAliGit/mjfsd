# Copyright (c) 2023, Tech Ventures and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class LoomProduction(Document):
	def before_save(self):
		if self.shift_working_hours:
			for row in self.loom_production_items:
				if row.rpm:
					unit_per_rpm = round((row.rpm * (0.72 / 12)) * self.shift_working_hours)
					row.unit_per_rpm = unit_per_rpm

					if row.actual_reading:
						try:
							row.effeciency = int((row.actual_reading / unit_per_rpm) * 100)
						except ZeroDivisionError:
							row.effeciency = 0

		
