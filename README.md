# orclapex-modal-lov
A modal LOV item plug-in for Oracle APEX that works in the Interactive Grid.

Page Item

<img src="https://github.com/mennooo/orclapex-modal-lov/blob/master/preview.gif" width="700px">

Interactive Grid Column Item

<img src="https://github.com/mennooo/orclapex-modal-lov/blob/master/images/ig.gif" width="700px">

## Demo
https://apex.oracle.com/pls/apex/f?p=115922:16

## Blog

## How to install
Download this repository and import the plug-in into your application from this location:

`plugin/item_type_plugin_mho_modal_lov.sql`

Additionally you can put the CSS & JavaScript on your web server and the PL/SQL code inside a package for better performance.

## Features
* Start typing in the page item to open the Modal LOV
* Open the Modal LOV by clicking the search icon
* Search in the Modal LOV
* Keyboard navigation in the Modal LOV (up, down, page-up, page-down, enter)
* Supports cascading LOV parent item(s)
* Correct rendering in Modal Dialog Pages
* Icon button to clear current value
* Built-in item validation to check if the value is present in the LOV
* Support for Interactive Grid column items
* Support for Universal Theme Template Options
* Support for Shared Component LOVs
* Set width of the Modal LOV (in pixels)
* Change value using a Dynamic Action or JavaScript
* Change number of rows in Modal LOV
* Change title of Modal LOV
* Change search placeholder
* Change Modal LOV title
* Change no-data-found message

## How to use
The plug-in uses the **List Of Values** attribute as source for the Modal LOV. In almost all scenarios, you will use a `Shared Component List Of Values` or a locally defined query. The maximum number of columns for a  `Shared Component List Of Values` is two (display & return). If you want to show extra columns in the Modal LOV, choose `SQL Query` and make sure to have at least three columns.

### SQL Query as LOV
The display and return column will not be shown in the Modal LOV. Make sure to add extra columns. Here is an example.
For nices column headings, make sure to add an alias to each column which is displayed.
```sql
select id r
     , name d
     , name "Name"
     , country "Country"
     , from_yr "Born in"
  from eba_demo_ig_people
 order by name;
```

The settings could be like this:

<img src="https://github.com/mennooo/orclapex-modal-lov/blob/master/images/settings.PNG" width="700px">

### Shared Component as LOV
The plug-in uses the item label as column heading for the display column in the Modal LOV. The return item is not displayed.

## Settings
You can find a detailed explanation in the help section of the plugin.

## Future developments
* Currently only support for VARCHAR2, NUMBER and DATE columns. If needed, others could be added.
* Please let me know any of your wishes

