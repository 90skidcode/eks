let dataTableName = '';
let id = '';
$(document).ready(function() {
    loadTable();

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
    singleDom(params);
    let tempdata = {
        "query": "name",
        "key": params[0].master_table_name
    }
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "tableDom", "param1": params[0].master_table_name });
}

function tableDom(params, tableName) {
    dataTableName = tableName;
    let name = params.message.split(',');
    var tableHeader = [];
    let html = '<tr>';
    let d = ['status', 'created_by', 'created_at', 'updated_at'];

    $.each(name, function(i, v) {
        if (!id) {
            id = v;
            v = 'S.No';
        }
        if (v) {
            if (d.indexOf(v) == -1) {
                tableHeader.push({
                    "data": v
                });
                html += `<td>${capitalizeFirstLetter((v.replace(/_/g, " ")))}</td>`;
            }
        }
    });
    tableHeader.push({
        "data": 'status',
        mRender: function(data, type, row) {
            return `<td>
                        <a data-bs-toggle="modal" data-bs-target="#modals-slide-in" title='Edit' data-id="${eval(row[id])}" class="btn btn-edit btn-icon btn-hover btn-sm btn-rounded pull-right">
                            &#9998;
                        </a>
                        <a data-bs-toggle="modal" data-bs-target="#modals-slide-in" title='Edit' data-id="${eval(row[id])}" class="btn btn-edit btn-icon btn-hover btn-sm btn-rounded pull-right">
                            &#9998;
                        </a>
                    </td>`;
        }
    });
    html += '<td class="text-center">Action</td></tr>';
    $(".datatables-basic thead").html(html);
    let tempdata = {
        "query": "fetch",
        "key": tableName,
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
        lengthMenu: [25, 50, 75, 100],
        buttons: [{ extend: "collection", className: "btn btn-outline-secondary dropdown-toggle me-2", text: feather.icons.clipboard.toSvg({ class: "font-small-4 me-50" }) + "PDF" }, { text: feather.icons.plus.toSvg({ class: "me-50 font-small-4" }) + "Add New Record", className: "create-new btn btn-primary", attr: { "data-bs-toggle": "modal", "data-bs-target": "#modals-slide-in" }, init: function(e, t, a) { $(t).removeClass("btn-secondary") } }],
        language: { paginate: { previous: "&nbsp;", next: "&nbsp;" } }
    });
    $("div.head-label").html(`<h6 class="mb-0">${tablenameConvertor(dataTableName)}</h6>`);
    feather.replace({
        width: 14,
        height: 14
    });
}

function tablenameConvertor(params) {
    let n = params.replace("eks_", "");
    n = n.replace(/_/gi, ' ');
    return capitalizeFirstLetter(n);
}


function singleDom(params) {
    let r = JSON.parse(params[0].master_table_json);
    let html = '';
    $.each(r, function(inx, val) {
        html += `<div class="mb-1">${domGenerator(val)}</div>`;
    });

    html += `<button type="button" class="btn btn-primary btn-save data-submit me-1" data-type="new">Save</button>
    <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>`;

    $(".single-dom").html(html);
    $('.select2').select2();
    $(".date").flatpickr();
    $(".time").flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });
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
        showToast('Add Successfully', 'success')
    } else showToast('Please try again!!', 'error');
}