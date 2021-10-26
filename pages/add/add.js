$(".date").flatpickr();
$(".time").flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
});
$(window).on('load', function() {
    if (feather) {
        feather.replace({
            width: 14,
            height: 14
        });
    }
});



$(document).on('click', '.content-body .nav .nav-item .nav-link', function() {
    $('.nav-link,.tab-pane').removeClass('active');
    $('.tab-pane').hide();
    $(this).addClass('active');
    $('.tab-pane[aria-labelledby="' + $(this).attr('id') + '"]').show();
})

$(document).ready(function() {
    let tempdata = {
        "query": "fetch",
        "key": "master_table",
        "column": {
            "*": "*"
        },
        "condition": {
            'company_id': user[0].company_id
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "menulist" });
});

function menulist(params) {
    let navItem = ``;
    let domItem = ``;
    $.each(params, function(i, v) {
        navItem += ` <li role="presentation" class="nav-item">
                        <a role="tab" aria-selected="true" aria-setsize="5" aria-posinset="1" href="#" target="_self" class="nav-link" id="${v.master_table_name}" aria-controls="">
                            <span class="font-weight-bold">${capitalizeFirstLetter((v.master_form_name))}</span></a>
                    </li>`;
        domItem += ` <div role="tabpanel" aria-hidden="false" class="tab-pane" aria-labelledby="${v.master_table_name}">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">${capitalizeFirstLetter((v.master_form_name))}</h4>
                            </div>
                            <div class="card-body">
                                <form class="${v.master_table_name}-repeater"  data-table="${v.master_table_name}">
                                    <div data-repeater-list="${v.master_table_name}">
                                        <div data-repeater-item>
                                            <div class="row d-flex align-items-end">`;

        $.each(JSON.parse(v.master_table_json), function(inx, val) {
            domItem += `<div class="col-md-2 col-12">${domGenerator(val)}</div>`;
        });

        domItem += `<div class="col-md-2 col-12 mb-50">
                        <button class="btn btn-outline-danger text-nowrap px-1" data-repeater-delete type="button">
                            <i data-feather="x" class="me-25"></i>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
                <hr />
                </div>
                    </div>
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-icon btn-primary repeat" type="button" data-repeater-create>
                                    <i data-feather="plus" class="me-25"></i>
                                    <span>Add New</span>
                                </button>
                                <button class="btn btn-icon btn-primary btn-save" type="button">
                                    <i data-feather="save" class="me-25"></i>
                                    <span>Save</span>
                                </button>
                            </div>
                        </div>
                     </form>
                    </div>
                    </div>
                </div>`;
    });
    $(".nav-left").html(navItem);
    $(".tab-content").html(domItem);
    $(".nav-left .nav-item").eq(0).find('.nav-link').addClass('active');
    $('.tab-pane').eq(0).addClass('active');
    $(".date").flatpickr();
    $(".time").flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });
    $('form').repeater();

}


$(document).on('click', '.repeat', function() {
    setTimeout(() => {
        $(".date").flatpickr();
        $(".time").flatpickr({
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
        });
    }, 100);
});
let success = true;
$(document).on('click', '.btn-save', function() {
    let c = $(this).closest('.card').find('form').attr('class');
    let t = $(this).closest('.card').find('form').attr('data-table');
    let v = $("." + c).repeaterVal();
    $.each(v[t], function(i, val) {
        let tempdata = {
            "query": "add",
            "key": t,
            "values": val
        }
        commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "successCount" });
    });
    (success) ? showToast('Add Successfully', 'success'): showToast('Please try again!!', 'error');
});

function successCount(params) {
    if (params.status_code != 200)
        success = false;
}