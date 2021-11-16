let dataTableName = '';
let formName = '';
let id = '';
let companyList = '';
$(document).ready(function() {
    let tempdata = {
        "query": "fetch",
        "key": 'company_master',
        "column": {
            "*": "*"
        },
        "condition": {
            'status': '1',
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "getCompany" });
});

function getCompany(params) {
    var url = new URL(window.location.href);
    id = url.searchParams.get("id");
    companyList = params;
    let e = '';
    $.each(params, function(i, v) {
        e += `<option value='${v.company_master_id}'>${v.company_master}</option>`;
    });
    let html = `
                <div class="mb-1"> 
                    <label class="form-label" for="id">Company</label>                    
                    <select class="form-control select2" name="company_id">
                        ${e}
                    </select>
                </div>
                <div class="mb-1"> 
                    <label class="form-label" for="value">Value</label>
                    <input type="text" name="value" class="form-control" id="value" placeholder="" />
                </div>
                <button type="button" class="btn btn-primary btn-save data-submit me-1" data-type="new">Save</button>
                <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>`;
    $('.single-dom').html(html);
    loadTable();
}


function loadTable() {
    if (getParameter('id')) {
        let tempdata = {
            "query": "fetch",
            "key": getParameter('id'),
            "column": {
                "*": "*"
            },
            "condition": {
                'status': '1'
            },
            "like": ""
        }
        commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "gettableDetails" });
    } else
        location.href = '../login/login.html';
}

function gettableDetails(params) {
    var url = new URL(window.location.href);
    id = url.searchParams.get("id");
    dataTableName = id;
    var tableHeader = [];
    let html = '<tr>';
    id = id + "_id";
    tableHeader.push({
        "data": id
    }, {
        "data": 'company_id',
        mRender: function(data, type, row) {
            try {
                if (data && typeof(data) != 'undefined' && data != 'undefined')
                    return `${companyList.find(x => x['company_master_id'] == data).company_master }`;
                else
                    return '';
            } catch (e) {
                return '';
            }
        }
    }, {
        "data": 'value'
    });
    html += `<td>ID</td>    
    <td>Company Name</td>
    <td>Value</td>`;
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
    html += '<td class="text-center">Action</td></tr>';
    $(".datatables-basic thead").html(html);
    tableDomGenerator(params, tableHeader)
}

function tableDomGenerator(params, tableheader) {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
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
    $("div.head-label").html(`<h6 class="mb-0">${removeUnWanted(id)}</h6>`);

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