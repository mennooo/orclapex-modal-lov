/* global apex */
var Handlebars = require('hbsfy/runtime')

// Require dynamic templates
var modalReportTemplate = require('./templates/modal-report.hbs')
Handlebars.registerPartial('report', require('./templates/partials/_report.hbs'))
Handlebars.registerPartial('rows', require('./templates/partials/_rows.hbs'))
Handlebars.registerPartial('pagination', require('./templates/partials/_pagination.hbs'))

;(function ($, window) {
  $.widget('mho.modalLov', {
    // default options
    options: {
      id: '',
      title: '',
      returnItem: '',
      displayItem: '',
      searchField: '',
      searchButton: '',
      searchPlaceholder: '',
      ajaxIdentifier: '',
      showHeaders: false,
      returnCol: '',
      displayCol: '',
      validationError: '',
      cascadingItems: '',
      modalSize: 'modal-md',
      noDataFound: '',
      allowMultilineRows: false,
      rowCount: 15,
      pageItemsToSubmit: '',
      markClasses: 'u-hot',
      hoverClasses: 'hover u-color-1'
    },

    _templateData: {},
    _lastSearchTerm: '',

    _overlayLoader: {
      options: {
        'overlayClass': 'region-overlay-loader',
        'refreshSelector': '.apex-refresh-loader',
        'ignoreSelector': '.apex-ignore-refresh-loader'
      }
    },

    // Combination of number, char and space, arrow keys
    _validSearchKeys: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // numbers
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, // chars
      93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, // numpad numbers
      40, // arrow down
      32, // spacebar
      8, // backspace
      106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 220 // interpunction
    ],

    _create: function () {
      var self = this

      // self.options.displayItem = 'p_ignore_' + self.options.displayItem

      // Trigger event on click input display field
      self._triggerLOVOnDisplay()

      // Trigger event on click input group addon button (magnifier glass)
      self._triggerLOVOnButton()

      // Set pagination actions
      self._initPagination()

      // Clear text when clear icon is clicked
      self._initClearInput()

      // Cascading LOV item actions
      self._initCascadingLOVs()

      // Init APEX pageitem functions
      self._initApexItem()
    },

    _onOpenDialog: function (modal, options) {
      var self = options.widget
      // Focus on search field in LOV
      window.top.$('#' + self.options.searchField).focus()
      // Remove validation results
      self._removeValidation()
      // Add text from display field
      if (options.fillSearchText) {
        window.top.$s(self.options.searchField, apex.item(self.options.displayItem).getValue())
      }
      // Add class on hover
      self._onRowHover(modal)
      // selectInitialRow
      self._selectInitialRow(modal)
      // Set action when a row is selected
      self._onRowSelected(modal)
      // Navigate on arrow keys trough LOV
      self._initKeyboardNavigation(modal)
      // Set search action
      self._initSearch()
    },

    _onCloseDialog: function (modal, options) {
      // close takes place when no record has been selected, instead the close modal (or esc) was clicked/ pressed
      // It could mean two things: keep current or take the user's display value
      // What about two equal display values?
  
      // But no record selection could mean cancel
      // but open modal and forget about it
      // in the end, this should keep things intact as they were
      options.widget._destroy(modal)
      options.widget._triggerLOVOnDisplay()
      // why the following?
      // window.top.$(window.top.document).trigger({
      //   type: 'keypress',
      //   which: 9
      // })
    },

    _onLoad: function (options) {
      var self = options.widget

      // hide loader
      self._hideOverlayLoader(self.pageSpinner)

      // Create LOV region
      var $modalRegion = window.top.$(modalReportTemplate(self._templateData)).appendTo('body')

      var dialogClass
      switch (self.options.modalSize) {
        case 'modal-lg':
          dialogClass = 'modal-l'
          break
        default:
          dialogClass = self.options.modalSize
      }

      // Open new modal
      $modalRegion.dialog({
        height: $modalRegion.find('.t-Report-wrap').height() + 150, // + dialog button height
        width: $modalRegion.find('.modal-lov-table > table').width(),
        closeText: apex.lang.getMessage('APEX.DIALOG.CLOSE'),
        modal: true,
        resizable: true,
        closeOnEscape: true,
        dialogClass: 'ui-dialog--apex ' + dialogClass,
        open: function (modal) {
          apex.util.getTopApex().navigation.beginFreezeScroll()
          self._onOpenDialog(this, options)
        },
        close: function (modal) {
          self._onCloseDialog(this, options)
          apex.util.getTopApex().navigation.endFreezeScroll()
        }
      })
    },

    _onReload: function (options) {
      var self = options.widget
      // This function is executed after a search
      var reportHtml = Handlebars.partials.report(self._templateData)
      var paginationHtml = Handlebars.partials.pagination(self._templateData)

      // Get current modal-lov table
      var modalLOVTable = window.top.$(window.top.document).find('#' + self.options.id + ' .modal-lov-table')
      var pagination = window.top.$(window.top.document).find('#' + self.options.id + ' .t-ButtonRegion-wrap')

      // Replace report with new data
      $(modalLOVTable).replaceWith(reportHtml)
      $(pagination).html(paginationHtml)

      // Get new modal-lov table
      modalLOVTable = window.top.$(window.top.document).find('#' + self.options.id + ' .modal-lov-table')
      // selectInitialRow in new modal-lov table
      self._selectInitialRow(modalLOVTable)
    },

    _getTemplateData: function () {
      var self = this

      // Create return Object
      var templateData = {
        id: self.options.id,
        classes: 'modal-lov',
        title: self.options.title,
        modalSize: self.options.modalSize,
        region: {
          attributes: 'style="bottom: 66px;"'
        },
        searchField: {
          id: self.options.searchField,
          placeholder: self.options.searchPlaceholder
        },
        report: {
          columns: {},
          rows: {},
          colCount: 0,
          rowCount: 0,
          showHeaders: self.options.showHeaders,
          noDataFound: self.options.noDataFound,
          classes: (self.options.allowMultilineRows) ? 'multiline' : ''
        },
        pagination: {
          rowCount: 0,
          firstRow: 0,
          lastRow: 0,
          allowPrev: false,
          allowNext: false
        }
      }

      // No rows found?
      if (self.options.dataSource.row.length === 0) {
        return templateData
      }

      // Get columns
      var columns = Object.keys(self.options.dataSource.row[0])

      // Pagination
      templateData.pagination.firstRow = self.options.dataSource.row[0]['ROWNUM###']
      templateData.pagination.lastRow = self.options.dataSource.row[self.options.dataSource.row.length - 1]['ROWNUM###']

      // Check if there is a next resultset
      var nextRow = self.options.dataSource.row[self.options.dataSource.row.length - 1]['NEXTROW###']

      // Allow previous button?
      if (templateData.pagination.firstRow > 1) {
        templateData.pagination.allowPrev = true
      }

      // Allow next button?
      try {
        if (nextRow.toString().length > 0) {
          templateData.pagination.allowNext = true
        }
      } catch (err) {
        templateData.pagination.allowNext = false
      }

      // Remove internal columns (ROWNUM###, ...)
      columns.splice(columns.indexOf('ROWNUM###'), 1)
      columns.splice(columns.indexOf('NEXTROW###'), 1)

      // Remove column return-item
      columns.splice(columns.indexOf(self.options.returnCol), 1)
      // Remove column return-display if display columns are provided
      if (columns.length > 1) {
        columns.splice(columns.indexOf(self.options.displayCol), 1)
      }

      templateData.report.colCount = columns.length

      // Rename columns to standard names like column0, column1, ..
      var column = {}
      $.each(columns, function (key, val) {
        if (columns.length === 1 && self.options.itemLabel) {
          column['column' + key] = {
            name: val,
            label: self.options.itemLabel
          }
        } else {
          column['column' + key] = {
            name: val
          }
        }
        templateData.report.columns = $.extend(templateData.report.columns, column)
      })

      /* Get rows

        format will be like this:

        rows = [{column0: "a", column1: "b"}, {column0: "c", column1: "d"}]

      */
      var tmpRow

      var rows = $.map(self.options.dataSource.row, function (row, rowKey) {
        tmpRow = {
          columns: {}
        }
        // add column values to row
        $.each(templateData.report.columns, function (colId, col) {
          tmpRow.columns[colId] = row[col.name]
        })
        // add metadata to row
        tmpRow.returnVal = $('<input value="' + row[self.options.returnCol] + '"/>').val() // little trick to remove special chars
        tmpRow.displayVal = $('<input value="' + row[self.options.displayCol] + '"/>').val() // little trick to remove special chars
        return tmpRow
      })

      templateData.report.rows = rows

      templateData.report.rowCount = (rows.length === 0 ? false : rows.length)
      templateData.pagination.rowCount = templateData.report.rowCount

      return templateData
    },

    _destroy: function (modal) {
      var self = this
      $(window.top.document).off('keydown')
      $(window.top.document).off('keyup', '#' + self.options.searchField)
      $('#' + self.options.displayItem).off('keyup')
      window.top.$(modal).remove()
    // Enable escape key for other modals
    // window.top.$('.modal').data('bs.modal').options.keyboard = true
    },

    _getData: function (options, handler) {
      var self = this

      var settings = {
        searchTerm: '',
        firstRow: 1,
        fillSearchText: true
      }

      settings = $.extend(settings, options)
      var searchTerm = (settings.searchTerm.length > 0) ? settings.searchTerm : window.top.$v(self.options.searchField)
      var items = self.options.pageItemsToSubmit

      // Store last searchTerm
      self._lastSearchTerm = searchTerm

      self.modalSpinner = self._showOverlayLoader(window.top.$('#' + self.options.id).find('.modal-lov-table'))

      apex.server.plugin(self.options.ajaxIdentifier, {
        x01: 'GET_DATA',
        x02: searchTerm, // searchterm
        x03: settings.firstRow, // first rownum to return
        pageItems: items
      }, {
        target: $('#' + self.options.returnItem),
        dataType: 'json',
        success: function (pData) {
          self._hideOverlayLoader(self.modalSpinner)
          self.options.dataSource = pData
          self._templateData = self._getTemplateData()
          handler({
            widget: self,
            fillSearchText: settings.fillSearchText
          })
        },
        error: function (pData) {
          self._hideOverlayLoader(self.modalSpinner)
          apex.message.alert(pData.responseText)
        }
      })
    },

    _initSearch: function () {
      var self = this
      // if the lastSearchTerm is not equal to the current searchTerm, then search immediate
      if (self._lastSearchTerm !== window.top.$v(self.options.searchField)) {
        self._getData({
          firstRow: 1
        }, self._onReload)
      }

      // Action when user inputs search text
      $(window.top.document).on('keyup', '#' + self.options.searchField, function (event) {
        // Do nothing for navigation keys and escape
        var navigationKeys = [37, 38, 39, 40, 9, 33, 34, 27]
        if ($.inArray(event.keyCode, navigationKeys) > -1) {
          return false
        }

        var srcEl = event.currentTarget
        if (srcEl.delayTimer) {
          clearTimeout(srcEl.delayTimer)
        }

        srcEl.delayTimer = setTimeout(function () {
          self._getData({
            firstRow: 1
          }, self._onReload)
        }, 350)
      })
    },

    _initPagination: function () {
      var self = this
      var prevSelector = '#' + self.options.id + ' .t-Report-paginationLink--prev'
      var nextSelector = '#' + self.options.id + ' .t-Report-paginationLink--next'

      // remove current listeners
      window.top.$(window.top.document).off('click', prevSelector)
      window.top.$(window.top.document).off('click', nextSelector)

      // Previous set
      window.top.$(window.top.document).on('click', prevSelector, function (e) {
        self._getData({
          firstRow: self._getFirstRownumPrevSet()
        }, self._onReload)
      })

      // Next set
      window.top.$(window.top.document).on('click', nextSelector, function (e) {
        self._getData({
          firstRow: self._getFirstRownumNextSet()
        }, self._onReload)
      })
    },

    _getFirstRownumPrevSet: function () {
      var self = this
      try {
        return self._templateData.pagination.firstRow - self.options.rowCount
      } catch (err) {
        return 1
      }
    },

    _getFirstRownumNextSet: function () {
      var self = this
      try {
        return self._templateData.pagination.lastRow + 1
      } catch (err) {
        return 16
      }
    },

    _openLOV: function (options) {
      var self = this
      // Remove previous modal-lov region
      $('#' + self.options.id, document).remove()
      // Show loader
      self.pageSpinner = self._showOverlayLoader($('#' + self.options.returnItem).closest('form'))
      // Load data and open modal modal-lov region
      self._getData({
        firstRow: 1,
        searchTerm: options.searchTerm,
        fillSearchText: options.fillSearchText
      }, self._onLoad)

      // $('#' + self.options.displayItem).trigger('mho:modallov:open')
    },

    _triggerLOVOnDisplay: function () {
      var self = this
      // Trigger event on click input display field
      $('#' + self.options.displayItem).on('keyup', function (e) {
        if ($.inArray(e.keyCode, self._validSearchKeys) > -1 && !e.ctrlKey) {
          // Also keep real item in sync without validations
          // But check for changes
          // TODO: find solution
          $('#' + self.options.returnItem).val(apex.item(self.options.displayItem).getValue())
          
          $(this).off('keyup')
          self._openLOV({
            searchTerm: apex.item(self.options.displayItem).getValue(),
            fillSearchText: true
          })
        }
      })
    },

    _triggerLOVOnButton: function () {
      var self = this
      // Trigger event on click input group addon button (magnifier glass)
      $('#' + self.options.searchButton).on('click', function (e) {
        self._openLOV({
          searchTerm: '',
          fillSearchText: false
        })
      })
    },

    _onRowHover: function (modal) {
      var self = this
      window.top.$(modal).on('mouseenter mouseleave', '.t-Report-report tr', function () {
        if ($(this).hasClass('mark')) {
          return
        }
        $(this).toggleClass(self.options.hoverClasses)
      })
    },

    _selectInitialRow: function (modal) {
      var self = this
      // If current item in LOV then select that row
      // Else select first row of report
      var $curRow = window.top.$(modal).find('.t-Report-report tr[data-return="' + apex.item(self.options.returnItem).getValue() + '"]')
      if ($curRow.length > 0) {
        $curRow.addClass('mark ' + self.options.markClasses)
      } else {
        window.top.$(modal).find('.t-Report-report tr[data-return]').first().addClass('mark ' + self.options.markClasses)
      }
    },

    _initKeyboardNavigation: function (modal) {
      var self = this

      function navigate (direction, event) {
        event.stopImmediatePropagation()
        event.preventDefault()
        var currentRow = window.top.$(modal).find('.t-Report-report tr.mark')
        switch (direction) {
          case 'up':
            if ($(currentRow).prev().is('.t-Report-report tr')) {
              $(currentRow).removeClass('mark ' + self.options.markClasses).prev().addClass('mark ' + self.options.markClasses)
            }
            break
          case 'down':
            if ($(currentRow).next().is('.t-Report-report tr')) {
              $(currentRow).removeClass('mark ' + self.options.markClasses).next().addClass('mark ' + self.options.markClasses)
            }
            break
        }
      }

      $(window.top.document).on('keydown', function (e) {
        switch (e.keyCode) {
          case 38: // up
            navigate('up', e)
            break
          case 40: // down
            navigate('down', e)
            break
          case 9: // tab
            navigate('down', e)
            break
          case 13: // ENTER
            var currentRow = window.top.$(modal).find('.t-Report-report tr.mark').first()
            self._returnSelectedRow(currentRow, modal)
            break
          case 33: // Page up
            e.preventDefault()
            window.top.$('#' + self.options.id + ' .t-ButtonRegion-buttons .t-Report-paginationLink--prev').trigger('click')
            break
          case 34: // Page down
            e.preventDefault()
            window.top.$('#' + self.options.id + ' .t-ButtonRegion-buttons .t-Report-paginationLink--next').trigger('click')
            break
        }
      })
    },

    _returnSelectedRow: function ($row, modal) {
      var self = this
      apex.item(self.options.returnItem).setValue($row.data('return'), $row.data('display'))
      // Also add the display value as data attr on the hidden return item. This is used for validation.
      $('#' + self.options.returnItem).data('display', $row.data('display'))

      // Trigger a custom event and add data to it: all columns of the row
      var data = {}
      $.each($('.t-Report-report tr.mark').find('td'), function (key, val) {
        data[$(val).attr('headers')] = $(val).html()
      })

      // $('#' + self.options.displayItem).trigger('mho:modallov:afterselect', data)

      // Finally hide the modal
      window.top.$(modal).dialog('close')

      // And focus on input or IG
      $('#' + self.options.displayItem).focus()
    },

    _onRowSelected: function (modal) {
      var self = this
      // Action when row is clicked
      window.top.$(modal).on('click', '.modal-lov-table .t-Report-report tr', function (e) {
        self._returnSelectedRow(window.top.$(this), modal)
      })
    },

    _removeValidation: function () {
      // Clear current errors
      apex.message.clearErrors(this.options.returnItem)
    },

    _clearInput: function () {
      var self = this
      apex.item(self.options.displayItem).setValue('')
      apex.item(self.options.returnItem).setValue('')
      $('#' + self.options.returnItem).data('display', '')
      self._removeValidation()
      $('#' + self.options.displayItem).focus()

    // $('#' + self.options.displayItem).trigger('mho:modallov:cleared')
    },

    _initClearInput: function () {
      var self = this

      $('#' + self.options.displayItem).parent().find('.search-clear').on('click', function () {
        self._clearInput()
      })
    },

    _showOverlayLoader: function (target) {
      if (target.length > 0) {
        return apex.util.showSpinner(target)
      }
    },

    _hideOverlayLoader: function (spinner) {
      if (spinner) {
        spinner.remove()
      }
    },

    // _getHashCode: function (text) {
    //   var hash = 0
    //   var char
    //   if (text.length === 0) return hash
    //   for (var i = 0; i < text.length; i++) {
    //     char = text.charCodeAt(i)
    //     hash = ((hash << 5) - hash) + char
    //     hash = hash & hash // Convert to 32bit integer
    //   }
    //   return hash
    // },

    _initCascadingLOVs: function () {
      var self = this
      window.top.$(self.options.cascadingItems).on('change', function () {
        self._clearInput()
      })
    },

    _setValueBasedOnDisplay: function (pValue) {
      var self = this
      apex.server.plugin(self.options.ajaxIdentifier, {
        x01: 'GET_VALUE',
        x02: pValue // returnVal
      }, {
        dataType: 'json',
        success: function (pData) {
          $('#' + self.options.returnItem).val(pData.returnValue)
          $('#' + self.options.displayItem).val(pData.displayValue)
          // Also add the display value as data attr on the hidden return item. This is used for validation.
          $('#' + self.options.returnItem).data('display', pData.displayValue)
        },
        error: function (pData) {
          // Throw an error
          throw Error('Modal LOV item value count not be set')
        }
      })
    },

    _initApexItem: function () {
      var self = this
      // Set and get value via apex functions
      apex.item.create(self.options.returnItem, {
        setValue: function (pValue, pDisplayValue, pSuppressChangeEvent) {
          if (pDisplayValue || pValue.length === 0) {
            $('#' + self.options.displayItem).val(pDisplayValue)
            $('#' + self.options.returnItem).val(pValue)
            $('#' + self.options.returnItem).data('display', pDisplayValue)
          } else {
            $('#' + self.options.displayItem).val(pDisplayValue)
            self._setValueBasedOnDisplay(pValue)
          }
        },
        getValue: function () {
          return $('#' + self.options.returnItem).val()
        },
        isChanged: function () {
          return document.getElementById(self.options.displayItem).value !== document.getElementById(self.options.displayItem).defaultValue
        }
      })
      apex.item(self.options.returnItem).callbacks.displayValueFor = function () {
        return $('#' + self.options.displayItem).val()
      }
    }
  })
})(apex.jQuery, window)
