////////////////////////////// VANSHIKA JAVASCRIPT /////////////////////////////////////////////////
/////////////////////////////////EDITABLE TABLE////////////////////////////////////////
(function ($, window, document, undefined) {
    var pluginName = "editable",
        defaults = {
            keyboard: true,
            dblclick: true,
            button: true,
            buttonSelector: ".edit",
            maintainWidth: true,

            edit: function () {},
            save: function () {},
            cancel: function () {}
        };

    function editable(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }
    editable.prototype = {
        init: function () {
            this.editing = false;
            if (this.options.dblclick) {
                $(this.element)
                    .css('cursor', 'pointer')
                    .bind('dblclick', this.toggle.bind(this));
            }
            if (this.options.button) {
                $(this.options.buttonSelector, this.element)
                    .bind('click', this.toggle.bind(this));
            }
        },
        toggle: function (e) {
            e.preventDefault();
            this.editing = !this.editing;
            if (this.editing) {
                this.edit();
            } else {
                this.save();
            }
        },
        edit: function () {
            var instance = this,
                values = {};

            $('td[data-field]', this.element).each(function () {
                var input,
                    field = $(this).data('field'),
                    value = $(this).text(),
                    width = $(this).width();

                values[field] = value;

                $(this).empty();

                if (instance.options.maintainWidth) {
                    $(this).width(width);
                }

                if (field in instance.options.dropdowns) {
                    input = $('<select></select>');

                    for (var i = 0; i < instance.options.dropdowns[field].length; i++) {
                        $('<option></option>')
                            .text(instance.options.dropdowns[field][i])
                            .appendTo(input);
                    };

                    input.val(value)
                        .data('old-value', value)
                        .dblclick(instance._captureEvent);
                } else {
                    input = $('<input type="text" />')
                        .val(value)
                        .data('old-value', value)
                        .dblclick(instance._captureEvent);
                }

                input.appendTo(this);

                if (instance.options.keyboard) {
                    input.keydown(instance._captureKey.bind(instance));
                }
            });

            this.options.edit.bind(this.element)(values);
        },

        save: function () {
            var instance = this,
                values = {};

            $('td[data-field]', this.element).each(function () {
                var value = $(':input', this).val();

                values[$(this).data('field')] = value;

                $(this).empty()
                    .text(value);
            });

            this.options.save.bind(this.element)(values);
        },

        cancel: function () {
            var instance = this,
                values = {};

            $('td[data-field]', this.element).each(function () {
                var value = $(':input', this).data('old-value');

                values[$(this).data('field')] = value;

                $(this).empty()
                    .text(value);
            });

            this.options.cancel.bind(this.element)(values);
        },

        _captureEvent: function (e) {
            e.stopPropagation();
        },

        _captureKey: function (e) {
            if (e.which === 13) {
                this.editing = false;
                this.save();
            } else if (e.which === 27) {
                this.editing = false;
                this.cancel();
            }
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new editable(this, options));
            }
        });
    };

})(jQuery, window, document);

editTable();

//custome editable starts
function editTable() {

    $(function () {


        $('table tr').editable({
            dropdowns: {
                sex: ['Male', 'Female']
            },
            edit: function (values) {
                $(".edit i", this)
                    .removeClass('fa-pencil')
                    .addClass('fa-save')
                    .attr('title', 'Save');


            },
            save: function (values) {
                $(".edit i", this)
                    .removeClass('fa-save')
                    .addClass('fa-pencil')
                    .attr('title', 'Edit');

                if (this in pickers) {
                    pickers[this].destroy();
                    delete pickers[this];
                }
            },
            cancel: function (values) {
                $(".edit i", this)
                    .removeClass('fa-save')
                    .addClass('fa-pencil')
                    .attr('title', 'Edit');

                if (this in pickers) {
                    pickers[this].destroy();
                    delete pickers[this];
                }
            }
        });
    });

}

$(".add-row").click(function () {
    $("#dataTable").find("tbody tr:first").before("<tr></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td data-field='name'></td><td><a class='button button-small edit' title='Edit'><i class='fa fa-pencil'></i></a> <a class='button button-small' title='Delete'><i class='fa fa-trash'></i></a></td></tr>");
    editTable();
    setTimeout(function () {
        $("#editableTable").find("tbody tr:first td:last a[title='Edit']").click();
    }, 200);

    setTimeout(function () {
        $("#editableTable").find("tbody tr:first td:first input[type='text']").focus();
    }, 300);

    $("#editableTable").find("a[title='Delete']").unbind('click').click(function (e) {
        $(this).closest("tr").remove();
    });

});

function myFunction() {

}

$("#editableTable").find("a[title='Delete']").click(function (e) {
    var x;
    if (confirm("Are you sure you want to delete entire row?") == true) {
        $(this).closest("tr").remove();
    } else {

    }
});


/// SCRIPT FOR SEARCHABLE INPUT //////
function filterFunction(that, event) {
    let container, input, filter, li, input_val;
    container = $(that).closest(".searchable");
    input_val = container.find("input").val().toUpperCase();
    if (["ArrowDown", "ArrowUp", "Enter"].indexOf(event.key) != -1) {
        keyControl(event, container)
    } else {
        li = container.find("ul li");
        li.each(function (i, obj) {
            if ($(this).text().toUpperCase().indexOf(input_val) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        container.find("ul li").removeClass("selected");
        setTimeout(function () {
            container.find("ul li:visible").first().addClass("selected");
        }, 100)
    }
}

function keyControl(e, container) {
    if (e.key == "ArrowDown") {
        if (container.find("ul li").hasClass("selected")) {
            if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
                container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
            }
        } else {
            container.find("ul li:first-child").addClass("selected");
        }
    } else if (e.key == "ArrowUp") {
        if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
            container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
        }
    } else if (e.key == "Enter") {
        container.find("input").val(container.find("ul li.selected").text()).blur();
        onSelect(container.find("ul li.selected").text())
    }
    container.find("ul li.selected")[0].scrollIntoView({
        behavior: "smooth",
    });
}

function onSelect(val) {
    alert(val)
}

$(".searchable input").focus(function () {
    $(this).closest(".searchable").find("ul").show();
    $(this).closest(".searchable").find("ul li").show();
});
$(".searchable input").blur(function () {
    let that = this;
    setTimeout(function () {
        $(that).closest(".searchable").find("ul").hide();
    }, 300);
});





$(document).on('click', '.searchable ul li', function () {
    $(this).closest(".searchable").find("input").val($(this).text()).blur();
    onSelect($(this).text())
});

$(".searchable ul li").hover(function () {
    $(this).closest(".searchable").find("ul li.selected").removeClass("selected");
    $(this).addClass("selected");
});



//////// script total amount /////
function add() {
    num1 = document.getElementById("firstNumber").value;
    num2 = document.getElementById("secondNumber").value;
    document.getElementById("total").innerHTML = Number(num1) + Number(num2);
}




//////////////////////////////END OF VANSHIKA JAVASCRIPT /////////////////////////////////////////////////

//////////////////////////////END OF VANSHIKA JAVASCRIPT /////////////////////////////////////////////////
// Rounak JS Start 
// Call the Voucher List's datatable jQuery plugin
$(document).ready(function () {
    $('#JournalVoucherList').DataTable({
        "paging": false,
        "info": false,
        "searching": false
    });
});

//filter & search

//Search
function ListSearch() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("journalvoucherlistt");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

//export pdf
function PDFExport() {
    html2canvas(document.getElementById('journalvoucherlistt'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();

            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
        }]
            };
            pdfMake.createPdf(docDefinition).download("Table.pdf");
        }
    });
}

//export excel

let button = document.querySelector("#ExcelExport");

button.addEventListener("click", e => {
    let table = document.querySelector("#JournalVoucherList");
    TableToExcel.convert(table);
});