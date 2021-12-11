let dataTableName = 'company_master';
let formName = '';
let id = '';
let companyList = '';
$(document).ready(function() {
    loadTable();
});

function loadTable(params) {
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
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "getCompany" });
}

function getCompany(params) {
    let html = `<div class="mb-1"> 
                    <label class="form-label" for="company_master">Name</label>
                    <input type="text" name="company_master" class="form-control" placeholder="" />
                </div>
                <div class="mb-1"> 
                    <label class="form-label" for="company_mobile">Mobile</label>
                    <input type="number" name="company_mobile" class="form-control" placeholder="" />
                </div>
                <div class="mb-1"> 
                    <label class="form-label" for="company_email">Email</label>
                    <textarea type="text" name="company_email" class="form-control" placeholder="" ></textarea>
                </div>
                <div class="mb-1"> 
                    <label class="form-label" for="email_template">EKS Email</label>
                    <textarea type="text" name="email_template" class="form-control" placeholder="" ></textarea>
                </div>
                <button type="button" class="btn btn-primary btn-save data-submit me-1" data-type="new">Save</button>
                <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>`;
    $('.single-dom').html(html);

    var tableHeader = [{
        "data": 'company_master_id'
    }, {
        "data": 'company_master'
    }, {
        "data": 'company_mobile'
    }, {
        "data": 'company_email'
    }, {
        "data": 'email_template'
    }];

    tableHeader.push({
        "data": 'status',
        mRender: function(data, type, row) {
            return `<div class="text-center">
                        <a data-bs-toggle="modal" data-bs-target="#modals-slide-in" title='Edit' data-id="${row['company_master_id']}" class="btn btn-edit btn-icon btn-hover btn-sm btn-rounded pull-right">
                            <i class="gg-pen"></i>
                        </a>
                        <a data-bs-toggle="modal"  title='Delete'  data-id="${row['company_master_id']}" class="btn btn-delete btn-icon btn-hover btn-sm btn-rounded pull-right">
                            <i class="gg-trash-empty"></i>
                        </a>
                    </div>`;
        }
    });

    let tableHtml = `<tr>
                        <td>ID</td>    
                        <td>Company Name</td>
                        <td>Mobile</td>
                        <td>Client Email</td>
                        <td>EKS Email</td>
                        <td>Action</td>
                    </tr>`;
    $(".datatables-basic thead").html(tableHtml);
    tableDomGenerator(params, tableHeader);
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
    $("div.head-label").html(`<h6 class="mb-0">Customer List</h6>`);

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
        tempdata['condition']['company_master_id'] = $(this).attr('data-id');
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
        tempdata['condition']['company_master_id'] = $(this).attr('data-id');
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
            'status': '1'
        },
        "like": ""
    };
    tempdata.condition['company_master_id'] = $(this).attr('data-id');
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