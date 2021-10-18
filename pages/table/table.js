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

    gettableDetails();
});

function gettableDetails(params) {
    let tempdata = {
        "query": "name",
        "key": params[0].master_table_name
    }
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "tableDom" });
}

function tableDom(params) {
    let name = params.message.split(',');
    var tableHeader = [];
    let html = '<thead><tr>';
    let d = ['status', 'created_by', 'created_at', 'updated_at'];
    $.each(name, function(i, v) {
        if (v) {
            if (d.indexOf(v) == -1) {
                console.log(i, v);
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
    html += '<td class="text-center">Action</td></tr></thead>';
    $(".datatables-basic").html(html);

    // dataTableDisplay(response, tableHeader, false, dataTableId)

}