$(".date").flatpickr();
$(".time").flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
});



$(document).on('click', '.content-body .nav .nav-item .nav-link', function() {
    $('.nav-link,.tab-pane').removeClass('active');
    $('.tab-pane').hide();
    $(this).addClass('active');
    $('.tab-pane[aria-labelledby="' + $(this).attr('id') + '"]').show();
})

$(document).ready(function() {
    let c = '';
    (localStorage.getItem('company-id')) ? c = localStorage.getItem('company-id'): c = user[0].company_id;
    let tempdata = {
        "query": "fetch",
        "key": "master_table",
        "column": {
            "*": "*"
        },
        "condition": {
            'company_id': c
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

        domItem += `<div class="col-md-12 col-12 mb-50 mt-50">
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
    $('.select2').select2();
    $('.select2').trigger('change');
    $('form').repeater({

        // (Optional)
        // "show" is called just after an item is added.  The item is hidden
        // at this point.  If a show callback is not given the item will
        // have $(this).show() called on it.
        show: function() {
            $(this).slideDown();
            $(".date").flatpickr();
            $(".time").flatpickr({
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
            });
            $(this).closest('form').find('select.select2').each(function() {
                let t = $(this).closest('div');
                let c = $(this).attr('data-id');
                let n = $(this).attr('name');
                let r = $(this).attr('required');
                t.find('.select2').remove();
                t.append(`<select class="form-control select2 ${n} ${c}"  data-id="${c}" name="${n}"  ${r}> ${selectJson[c]} </select>`);
                $('.select2').select2();
                $('.select2').trigger('change');
            })
        },
        // (Optional)
        // "hide" is called when a user clicks on a data-repeater-delete
        // element.  The item is still visible.  "hide" is passed a function
        // as its first argument which will properly remove the item.
        // "hide" allows for a confirmation step, to send a delete request
        // to the server, etc.  If a hide callback is not given the item
        // will be deleted.
        hide: function(deleteElement) {
            if (confirm('Are you sure you want to delete this row ?')) {
                $(this).slideUp(deleteElement);
            }
        },
        isFirstItemUndeletable: true
    })

}
let clicked = '';
$(document).on('click', '.btn-save', function() {
    $(this).attr('disabled', 'disabled');
    let c = $(this).closest('.card').find('form').attr('class');
    let t = $(this).closest('.card').find('form').attr('data-table');
    if (checkRequired("." + c)) {
        let v = $("." + c).repeaterVal();
        clicked = $("." + c);
        $.each(v[t], function(i, val) {
            let tempdata = {
                "query": "add",
                "key": t,
                "values": val
            }
            tempdata["values"]['status'] = 1;
            commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "successCount" });
        });
        $(this).removeAttr('disabled', 'disabled');
    } else
        $(this).removeAttr('disabled', 'disabled');
});

function successCount(params) {
    (params.status_code == 200) ? showToast('Add Successfully', 'success'): showToast('Please try again!!', 'error');
    $('[data-repeater-list]').empty();
    $('[data-repeater-create]').click();

}