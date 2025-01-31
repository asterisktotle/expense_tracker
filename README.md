Expense Tracker

this is my first full stack app as im learning how frontend and backend works

- timeline -

Date: January 26, 2025

- I use shadCN for UI, im new to this ui library
  Bugs encountered:
- dialog description is undefined: I removed it because I did't want to use it
  Fixed: I set the <DialogDescription > {null} <DialogDescription>

Date: January 28, 2025

- I learn how to use ShadCN components and integrate it to my logic. I added pie chart and dialog with nested form and tabs that has two categories (expense & income)

Date: January 29, 2025
Bugs encountered:

- types error and first transaction did not display on the screen.
  Fixed: removed the useEffect on the context, instead set the new state on a single handleSubmit action.
- Finished connecting the pie chart based on transaction details
