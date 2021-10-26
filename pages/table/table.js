let dataTableName = '';
$(document).ready(function() {
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

});

function gettableDetails(params) {
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
        "data": 'action',
        mRender: function(data, type, row) {
            return `<td>
                        <a href="edit.html?id=${row.master_table_id}" title='Edit' class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                            <i class="gg-pen"></i>
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
            'status': getParameter('id')
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "tableDomGenerator", "param1": tableHeader }, { "functionName": "tableDomGenerator", "param1": tableHeader });

}

function tableDomGenerator(params, tableheader) {
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
        lengthMenu: [7, 10, 25, 50, 75, 100],
        buttons: [{ extend: "collection", className: "btn btn-outline-secondary dropdown-toggle me-2", text: feather.icons.clipboard.toSvg({ class: "font-small-4 me-50" }) + "PDF" }, { text: feather.icons.plus.toSvg({ class: "me-50 font-small-4" }) + "Add New Record", className: "create-new btn btn-primary", attr: { "data-bs-toggle": "modal", "data-bs-target": "#modals-slide-in" }, init: function(e, t, a) { $(t).removeClass("btn-secondary") } }],
        language: { paginate: { previous: "&nbsp;", next: "&nbsp;" } }
    });
    $("div.head-label").html(`<h6 class="mb-0">${tablenameConvertor(dataTableName)}</h6>`)
}

function tablenameConvertor(params) {
    let n = params.replace("eks_", "");
    n = n.replace(/_/gi, ' ');
    return capitalizeFirstLetter(n);
}