let dataTableName = '';
let formName = '';
let id = '';
$(document).ready(function() {
    loadTable();

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    if (comapny_id_array.indexOf(id) == -1) {
        location.href = '../../index.html';
    }
});

function loadTable() {
    if (getParameter('id')) {
        let tempdata = {
            "query": "fetch",
            "key": "master_table",
            "column": {
                "*": "*"
            },
            "condition": {
                'master_table_id': getParameter('id')
            },
            "like": ""
        }
        commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "gettableDetails" });
    } else
        location.href = '../login/login.html';
}

function gettableDetails(params) {
    formName = params[0].master_form_name;
    dataTableName = params[0].master_table_name;
    let r = JSON.parse(params[0].master_table_json);
    let htmlDOM = '';
    $.each(r, function(inx, val) {
        htmlDOM += `<div class="mb-1">${domGenerator(val)}</div>`;
    });

    htmlDOM += `<button type="button" class="btn btn-primary btn-save data-submit me-1" data-type="new">Save</button>
    <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>`;

    $(".single-dom").html(htmlDOM);
    $('.select2').select2();
    $(".date").flatpickr();
    $(".time").flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });

    var tableHeader = [];
    let html = '<tr>';
    id = dataTableName.replace('eks_', '') + "_id";
    tableHeader.push({
        "data": id
    });
    html += `<td>ID</td>`;
    if (typeof(customerUrlid) != 'undefined' && !customerUrlid) {
        tableHeader.push({
            "data": 'status',
            mRender: function(data, type, row) {
                return `<div class="text-center">
                        <a data-bs-toggle="modal" data-bs-target="#modals-slide-in" title='Edit' data-id="${eval(row[id])}" class="btn btn-edit btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="gg-pen"></i>
                        </a>
                        <a data-bs-toggle="modal"  title='Delete' data-id="${eval(row[id])}" class="btn btn-delete btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="gg-trash-empty"></i>
                        </a>
                    </div>`;
            }
        });
        html += '<td class="text-center">Action</td>';
    }
    $.each(JSON.parse(params[0].master_table_json), function(i, v) {
        if (v.name) {
            if (v.type == 'file') {
                tableHeader.push({
                    "data": v.name,
                    mRender: function(data, type, row) {
                        if (data)
                            return `<img src="${serverUrl}/uploads/${data}" width="50" height="50">`;
                        else
                            return '';
                    }
                });
            } else if (v.type == 'select' || v.type == 'textarea') {

                tableHeader.push({
                    "data": v.name,
                    mRender: function(data, type, row) {
                        // console.log(dropdownValuesList[v.name].find(x => x['ma_' + v.name + '_master_id'] == data).value);
                        try {
                            if (data && typeof(data) != 'undefined' && data != 'undefined')
                                return `${dropdownValuesList[v.name].find(x => x['ma_'+v.name+'_master_id'] == data).value }`;
                            else
                                return '';
                        } catch (e) {
                            return '';
                        }
                    }
                });

            } else {
                tableHeader.push({
                    "data": v.name
                });
            }
            html += `<td>${v.label}</td>`;
        }
    });

    html += '</tr>';
    $(".datatables-basic thead").html(html);
    let tempdata = {
        "query": "fetch",
        "key": dataTableName,
        "column": {
            "*": "*"
        },
        "condition": {
            'status': '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "tableDomGenerator", "param1": tableHeader }, { "functionName": "tableDomGenerator", "param1": tableHeader });
}

function tableDomGenerator(params, tableheader) {
    if ($("#base-table").hasClass('dataTable'))
        $("#base-table").dataTable().fnDestroy();
    var e = $(".datatables-basic"),
        t = $(".dt-date"),
        a = $(".dt-complex-header"),
        s = $(".dt-row-grouping"),
        l = $(".dt-multilingual"),
        o = "../../../app-assets/";

    var n = e.DataTable({
        columns: tableheader,
        dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        data: params,
        "scrollX": true,
        lengthMenu: [25, 50, 75, 100, 500, 1000],
        buttons: [{
                className: "btn btn-outline-secondary me-2 excel",
                text: feather.icons.clipboard.toSvg({ class: "font-small-4 me-50" }) + "Excel",

            },
            {
                text: feather.icons.plus.toSvg({ class: "me-50 font-small-4" }) + "Add New Record",
                className: "create-new btn btn-primary",
                attr: { "data-bs-toggle": "modal", "data-bs-target": "#modals-slide-in" },
                init: function(e, t, a) { $(t).removeClass("btn-secondary") }
            }
        ],
        language: { paginate: { previous: "&nbsp;", next: "&nbsp;" } },
        "order": [
            [0, 'desc']
        ],
    });

    $("div.head-label").html(`<h6 class="mb-0">${tablenameConvertor(formName)}</h6>`);

}

function tablenameConvertor(params) {
    let n = params.replace("eks_", "");
    n = n.replace(/_/gi, ' ');
    n = n.replace(/[0-9]+/gi, ' ');
    return capitalizeFirstLetter(n);
}



$(document).on('click', '.btn-save', function() {
    let t = '';
    let tempdata = '';
    if ($(this).attr('data-type') == 'new') {
        tempdata = {
            "query": 'add',
            "key": dataTableName,
            "values": $("#single-dom").serializeObject()
        }
        tempdata["values"]['status'] = 1;
    } else {
        tempdata = {
            "query": 'update',
            "key": dataTableName,
            "values": $("#single-dom").serializeObject(),
            "condition": {}

        }
        tempdata['condition'][id] = $(this).attr('data-id');
    }
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "successCount" });

});

$(document).on('click', '.btn-delete', function() {
    if (confirm('Are you sure want to delete?')) {
        let tempdata = {
            "query": 'update',
            "key": dataTableName,
            "values": {
                "status": 0
            },
            "condition": {}

        }
        tempdata['condition'][id] = $(this).attr('data-id');
        commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "successCount" });
    }
});


$(document).on('click', '.create-new', function() {
    $('.btn-save').attr('data-type', 'new');
    $("#single-dom")[0].reset();
});

$(document).on('click', '.btn-edit', function() {
    $('.btn-save').attr('data-type', 'edit');
    $('.btn-save').attr('data-id', $(this).attr('data-id'));
    let tempdata = {
        "query": "fetch",
        "key": dataTableName,
        "column": {
            "*": "*"
        },
        "condition": {
            'status': '1',

        },
        "like": ""
    }
    tempdata.condition[id] = $(this).attr('data-id');
    $("#single-dom")[0].reset();
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "multipleSetValue" });
});

function successCount(params) {
    if (params.status_code == 200) {
        loadTable();
        showToast('Add Successfully', 'success');
        $("#modals-slide-in").modal('hide');
    } else showToast('Please try again!!', 'error');
}