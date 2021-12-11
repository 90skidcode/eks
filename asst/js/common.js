/**
 * Title
 */

$('title').html('EKS');

/**
 * Input Auto Complete Off
 */

$('input').attr('autocomplete', 'no-fill');

$('.content-body').prepend(`<div class="notification-toast top-right" id="notification-toast"></div>`);

/**
 * Select 2


$(document).ready(function() {
    if ($('.select2').length) {
        $('.select2').select2();
        $('select').on('select2:open', function(e) {
            $('.add-new-record').remove()
            if (typeof($(this).attr('data-hasModel')) != 'undefined' && $(this).attr('data-hasModel')) {
                $(".select2-results__options").after('<div class="add-new-record" data-toggle="modal" data-target="#' + $(this).attr('data-hasModel') + '"><i class="anticon anticon-plus"></i> Add New Record</div>')
            }
        });
        $(document).on('shown.bs.modal', function(e) {
            try {
                if ($('body').find('.select2-container--open').length) {
                    $('.select2').select2("close");
                    var targetId = e.target.id.replace("_modal", "");
                    $('[name="' + targetId + '"]').focus();
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
});
 */



function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
}





/**
 * 
 * @param {JSON} data  Full data for Table list
 * @param {JSON} column  Column Header
 * @param {boolean} filter  Individual Column filter
 * @param {'string'} dataTableId Table ID
 */

/**
 * Table
 */
function dataTableDisplay(data, column, filter, dataTableId) {
    $('#' + dataTableId).DataTable({
        dom: 'Bfrtlip',
        "pagingType": "full_numbers",
        colReorder: true,
        fixedHeader: true,
        paging: true,
        keys: true,
        'columns': column,
        'data': data,
        initComplete: function() {
            if (filter) {
                var i = 0;
                this.api().columns().every(function() {
                    var column = this;
                    if ($("thead tr:first-child th").eq(i).text() != 'Action') {
                        var select = $('<select><option value=""></option></select>')
                            .appendTo($("thead tr:first-child th").eq(i).empty())
                            .on('change', function() {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
                                column
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                            });
                        column.data().unique().sort().each(function(d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        });
                        i++;
                    } else {
                        $("thead tr:first-child th").eq(i).html("")
                    }
                });
            }
        }
    });
}

/**
 * To Serlize object
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    var $radio = $('input[type=radio],input[type=checkbox]', this);
    $.each($radio, function() {
        if (!o.hasOwnProperty(this.name)) {
            o[this.name] = '';
        }
    });
    return o;
};

/**
 *  To Get Parameter
 *  @parameterName 
 */

function getParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


/**
 * ShoW Toast
 * @param {string} msg Message
 * @param {string} type it shoul be success/error
 */

function showToast(msg, type) {
    let background = "";
    let icon = '';
    (type == 'error') ? background = 'badge-danger': background = 'badge-success';
    (type == 'success') ? icon = 'anticon-check-circle': icon = 'anticon-info-circle'
    var toastHTML = `<div class="toast fade show ${background}">
        <div class="toast-header ">
            <i class="anticon ${icon} m-r-5 text-white"></i>
            <strong class="mr-auto">${type.toUpperCase()}</strong>
            <button type="button" class="ml-2 close text-white" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            ${msg}
        </div>
    </div>`;

    $('#notification-toast').append(toastHTML);

}


/* Input for number no negative numbers */

$("input[type=number]").each(function(index) {
    $(this).attr({
        "min": "0",
        "oninput": "validity.valid||(value='')"
    });
});


/**
 * Loader 
 * @param {boolean} type 
 * 
 */

function loader(type) {
    (type) ? $(".loader-area").removeClass('display-none'): $(".loader-area").addClass('display-none');
}

/* For Validate Required field */

$(document).on('keyup blur', '[required]', function() {
    ($(this).val()) ? $(this).removeClass('is-invalid'): $(this).addClass('is-invalid');
})


/**
 * Required field checker
 * @param {string} selector  ID/Class for the Form
 */

function checkRequired(selector) {
    var flag = true;
    $(selector + " [required]").each(function(index) {
        if (!$(this).val()) {
            $(this).addClass('is-invalid');
            flag = false;
        } else
            $(this).removeClass('is-invalid');
    });
    return flag;
}

/**
 * Common ajax functions
 * @param {string} url 
 * @param {string} type 
 * @param {JSON} data 
 * @param {string} resetFormSelector  ID/Class for the Form to reset after success
 * @param {string} sMessage 
 * @param {string} eMessage 
 * @param {JSON} sCallBack  *function* for function name, *param* for call back paramater
 * @param {JSON} eCallBack  *function* for function name, *param* for call back paramater
 */
var serverUrl = 'https://www.thecoderspace.com/codedev/eks/api/';

function commonAjax(url, type, data, resetFormSelector, sMessage, eMessage, sCallBack, eCallBack) {
    loader(true);
    $.ajax({
        url: (isEmptyValue(url)) ? serverUrl + 'services.php' : serverUrl + url,
        type: type,
        data: data,
        async: false,
        success: function(response) {
            loader(false);
            try {
                var response = JSON.parse(response);
                if (data.query == 'fetch') {
                    if (!isEmptyValue(response)) {
                        if (!isEmptyValue(resetFormSelector)) {
                            $(".select2[multiple]").val(null).trigger("change");
                            $(resetFormSelector)[0].reset();
                        }
                        if (!isEmptyValue(sMessage))
                            showToast(sMessage, 'success')
                        if (!isEmptyValue(sCallBack))
                            window[sCallBack.functionName](response, sCallBack.param1, sCallBack.param2, sCallBack.param3)
                    } else {
                        if (!isEmptyValue(eMessage))
                            showToast(eMessage, 'error')
                        if (!isEmptyValue(eCallBack))
                            window[eCallBack.functionName](response, eCallBack.param1, eCallBack.param2, eCallBack.param3)
                    }
                } else {
                    if (response.status_code == '200') {
                        if (!isEmptyValue(resetFormSelector)) {
                            $(".select2[multiple]").val(null).trigger("change");
                            $(resetFormSelector)[0].reset();
                        }
                        if (!isEmptyValue(sMessage))
                            showToast(sMessage, 'success')
                        if (!isEmptyValue(sCallBack))
                            window[sCallBack.functionName](response, sCallBack.param1, sCallBack.param2, sCallBack.param3)
                    } else {
                        (isEmptyValue(eMessage)) ? showToast(response.message, 'error'): showToast(eMessage, 'error')
                        if (!isEmptyValue(eCallBack))
                            window[eCallBack.functionName](response, eCallBack.param1, eCallBack.param2, eCallBack.param3)
                    }
                }
            } catch (err) {
                console.log(err)
            }

        }
    });
}

/**
 * To check a value is empty or not 
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
 */

function isEmptyValue(value) {
    return (
        // null or undefined
        (value == null) ||

        // has length and it's zero
        (value.hasOwnProperty('length') && value.length === 0) ||

        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
    )
}

/**
 * To List in Select2
 * @param {JSON} data 
 * @param {string} selector ID/Class name of the node
 * @param {String} Label for Select 2
 * @param {String} Value for Select 2
 */

function listSelect2(data, selector, jsonLabel, jsonValue) {
    let select2Data = [];
    let i = 1;
    data.forEach(element => {
        if (jsonValue)
            i = eval('element.' + jsonValue);
        select2Data.push({ 'id': i, 'text': eval('element.' + jsonLabel) })
        if (!jsonValue || typeof(jsonjsonValueKey) == 'undefined')
            i++;
    });
    $(selector).select2({
        data: select2Data
    })
}


/**
 * Location Reload
 */

function locationReload() {
    setTimeout(function() {
        location.reload();
    }, 1100)
}

/**
 * Setting Value to field
 * @param {string} Field name attr
 * @param {string} Field Value
 */

function setValue(name, value) {
    if ($('[name="' + name + '"]').prop("tagName") == 'INPUT') {
        if ($('[name="' + name + '"]').attr('type') == 'radio') {
            $('[name="' + name + '"][value="' + value + '"]').prop('checked', true);
        } else $('[name="' + name + '"]').val(value);
    } else {
        $('[name="' + name + '"]').val(value);
        if ($('[name="' + name + '"]').hasClass('select2'))
            $('[name="' + name + '"]').trigger('change');
    }
}


/*
 * Check Edit or Add
 */

function checkAddOrEdit(databasename, conditionkey, imageFlag) {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    if (!isEmptyValue(id)) {
        let data = {
            "query": 'fetch',
            "databasename": databasename,
            "column": {
                "* ": " *"
            },
            "condition": {},
            "like": ""
        }

        data['condition'][conditionkey] = id;
        let flag = false;
        if (imageFlag && typeof(imageFlag) != 'undefined') {
            flag = true;
        }
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "multipleSetValue", "param1": flag })
    }
}

/**
 * Multiple set value
 * @param { JSON } 
 */

function multipleSetValue(responce, imageFlag) {
    if (!isEmptyValue(responce)) {
        $.each(responce[0], function(i, v) {
            setValue(i, v)
        })
    }
    docShow();
    $('.select2').trigger('change');

}

/**
 * Based on the flag
 * @param {Booleen} imageFlag 
 */
function docShow(imageFlag, ele) {
    /**  if (imageFlag) {
          (ele) ? uploadData = ele.val().split(","): uploadData = $('[name=customer_doc]').val().split(",");
          
           * To preload Image in edit  
          
          let html = '';
          if (uploadData.toString() != "" && uploadData) {
              $.each(uploadData, function(i, v) {
                  let randomClass = randomString(16, 'aA');
                  html += ` <div class="col-md-3 ${randomClass}" data-val="${v}">
                              <span class="badge-danger float-right border-radius-round position-absolute pointer remove-img" title="remove">
                                  <span class="icon-holder">
                                      <i class="anticon anticon-close"></i>
                                  </span>
                              </span>
                              <img class="w-100" src="http://glowmedia.in/frontoffice/admin/api/uploads/${v}" alt="">                        
                          </div>`;
              })
              if (ele) {
                  $("#v-pills-tabContent .image-prev-area").append(html);
                  $("#v-pills-tabContent .image-prev-area").removeClass('d-none');
              } else {
                  $(".image-prev-area").append(html);
                  $(".image-prev-area").removeClass('d-none');
              }
          }
      } */

    $('input[type="hidden"]').each(function() {
        let i = $(this).val();
        $(this).closest('div').append(`<div class="img-area"><span class="img-clear">X</span> <img src="${serverUrl}/uploads/${i}" width="140" height="140"> </div>`)
    })
}

/**
 * Local Imgae file to Base64 Image
 * @param {*} input Eg: this
 * @param {*} randomClass  where the image want to set Classname
 */

function readURL(input, randomClass) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("." + randomClass + " img").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

/**
 * Ramdom String 
 * @param {*} length Eg : 16
 * @param {*} chars Eg: 'aA' , '#aA' , '#A!'
 */

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

/**
 * Remove Item From Array
 * @param {*} array Eg:[a,b,'c',d] 
 * @param {*} value Eg: b
 */

function removeItemOnce(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}


/**
 *  Wheel Scroll Stop in JS
 */

$('input').on("wheel mousewheel ", function(e) {
    if (e.originalEvent.deltaY > 0) {
        e.preventDefault();
        return;
    } else if (e.originalEvent.wheelDeltaY < 0) {
        e.preventDefault();
        return;
    }
});

/**
 * 
 * @param {Numbers} value eg : 1234567
 * @returns Rs.12,34,567.00
 */

function numberWithCommas(value) {
    let x = 0;
    (typeof(value) != 'undefined') ? x = value: x = 0;
    return "Rs." + (x.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ','));
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Input Gendration based on JSON
 * @param {JSON} params 
 */

function domGenerator(j) {
    let r = randomString(16, 'aA');
    let star = (j.required == 'true') ? '<span class="red">*</span>' : '';
    let required = (j.required == 'true') ? 'required' : '';
    switch (j.type) {
        case 'text':
            return `<label class="form-label" for="${j.name}">${j.label}${star}</label>
                    <input type="text" name="${j.name}" class="form-control ${j.name}" id="${j.name}"  placeholder="" ${required} /> `;
        case 'number':
            return `<label class="form-label" for="${j.name}">${j.label}${star}</label>
                    <input type="number" name="${j.name}" class="form-control ${j.name}" id="${j.name}"  placeholder="" ${required} /> `;
        case 'file':
            return `<label class="form-label" for="${j.name}">${j.label}${star}</label>
                    <input type="file"  class="form-control ${j.name}s" id="${j.name}s" data-id="${r}gg"  accept=".png,.jpg,.jpeg,.gif" placeholder="" ${required} /> 
                    <div class="progress-bar"  data-ids="${r}gg"></div>
                    <input type="hidden" name="${j.name}" class="${j.name}" id="${r}gg"   placeholder="" ${required} /> `;
        case 'date':
            return `<label class="form-label " for="${j.name}">${j.label}${star}</label>
                    <input type="text" name="${j.name}" id="${j.name}" class="form-control post date" placeholder="MM/DD/YYYY" aria-label="MM/DD/YYYY" ${required}  />`
        case 'autocomplete':
            return `<label class="form-label" for="${j.name}">${j.label}${star}</label>
                    <input type="text" name="${j.name}" class="form-control  ${j.name}" id="${j.name}"placeholder="00:00" aria-label="00:00"  ${required} /> `;
        case 'textarea':
            return `<label class="form-label" for="${j.name}">${j.label}${star}</label>                    
                    <select class="form-control select2 ${j.name} ${r}" data-id="${r}" name="${j.name}" ${required} >
                    ${dropdownValues(j.name, r)}
                    </select>`;
            /* return `<label class="form-label" for="${j.name}">${j.label}</label>
                     <textarea type="text" name="${j.name}" class="form-control ${j.name}" id="${j.name}"  placeholder="" ${required} /></textarea>`;*/
        case 'radio-group':
            return `<label class="form-label" for="${j.name}">${j.label}${star}</label><br>
                    ${radioButtonDom(j)}`;
        case 'select':
            return `<label class="form-label" for="${j.name}">${j.label}${star}</label>                    
                    <select class="form-control select2 ${j.name} ${r}" data-id="${r}" name="${j.name}" ${required} >
                    ${dropdownValues(j.name, r)}
                    </select>`;
        default:
            return ``;
    }
}

/** <input list="${r}" class="form-select" name="${j.name}"> 
 * required="${(j.required)  ? true :  false}"
 */

/**
 * 
 * @param {*} table_name 
 * @param {*} r 
 */

var dropdownValuesList = [];

function dropdownValues(table_name, r) {
    let c = '';
    let ch = '';
    (typeof(customerUrlid) != 'undefined' && customerUrlid) ? ch = customerUrlid: ch = user[0].company_id;

    (localStorage.getItem('company-id')) ? c = localStorage.getItem('company-id'): c = ch;
    let tempdata = {
        "query": "fetch",
        "key": "ma_" + table_name + "_master",
        "column": {
            "*": "*"
        },
        "condition": {
            'company_id': c,
            'status': '1'
        },
        "like": ""
    }
    let v = '';
    if (dropdownValuesList[table_name]) {
        v = domdropdownValues(dropdownValuesList[table_name], r, table_name);
    } else {
        $.ajax({
            url: serverUrl + 'database.php',
            type: 'POST',
            data: tempdata,
            async: false,
            success: function(response) {
                v = domdropdownValues(JSON.parse(response), r, table_name);
            }
        })
    }
    return v;
}

var selectJson = [];

function domdropdownValues(params, className, table_name) {
    dropdownValuesList[table_name] = params;
    let html = `<option value=''>Select</option>`;
    $.each(params, function(i, v) {
        html += `<option value='${eval('v.ma_' + table_name + '_master_id')}'>${v.value}</option>`;
    });
    $("." + className).html(html);
    selectJson[className] = html;
    return html;
}

function radioButtonDom(params) {
    let h = '';
    params.values.forEach(e => {
        h += `  <input type="radio"  name="${params.name}" value="${e.label}">
                <label for="html">${e.label}</label><br>`
    });
    return h;
}




/**
 * File Upload
 */
var uploadData = '';
$(document).ready(function() {
    $(document).on('change', 'input[type="file"]', function() {
        $(".btn-save").prop('disabled', true);
        var t = $(this)
        var file_data = t.prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        loader(true)
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        t.closest('div').find(".progress-bar").css({
                            width: percentComplete + "%"
                        })
                        if (percentComplete === 100) {
                            setTimeout(() => {
                                t.closest('div').find(".progress-bar").css({
                                    width: 0 + "%"
                                })
                            }, 2000);
                        }
                    }
                }, false);
                return xhr;
            },
            url: serverUrl + 'upload.php',
            type: "POST",
            data: form_data,
            contentType: false,
            enctype: 'multipart/form-data',
            cache: false,
            processData: false,
            success: function(data) {
                $(".btn-save").prop('disabled', false);
                let dataResult = JSON.parse(data);
                if (dataResult.status_code == 200) {
                    showToast(dataResult.message, 'success');
                    $("#" + t.attr('data-id')).val(' ');
                    $("#" + t.attr('data-id')).val(dataResult.result);
                    t.closest('div').find('.img-area').remove();
                    t.closest('div').append(`<div class="img-area"><span class="img-clear">X</span> <img src="${serverUrl}/uploads/${dataResult.result}" width="140" height="140"> </div>`)
                } else {
                    showToast(dataResult.message, 'error');
                }
                loader(false);
            },
            error: function(data) {
                $(".btn-save").prop('disabled', false);
                loader(false);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
});

$(document).on('click', '.img-clear', function() {
    $(this).closest('.mb-1').find('[type=hidden]').val('');
    $(this).closest('.mb-1').find('[type=file]').val('');
    $(this).closest('.img-area').remove();
    showToast("File removed successfully", 'success');
});

$(document).on('click', '.close', function() {
    $(this).closest('.toast').toast('hide');
    $(this).closest('.toast').remove();
});

function tableToExcel(table, name, filename) {
    let uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) },
        format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

    var link = document.createElement('a');
    link.download = filename;
    link.href = uri + base64(format(template, ctx));
    link.click();
}

$(document).on('click', '.excel', function() {
    tableToExcel('base-table', $('.head-label h6').text(), $('.selected-language').text() + " - " + $('.head-label h6').text() + " - " + new Date().getTime())
});

/**
 * Required field checker
 * @param {string} selector  ID/Class for the Form
 */

function checkRequired(selector) {
    var flag = true;
    $(selector + " [required]").each(function(index) {
        if (!$(this).val()) {
            $(this).addClass('is-invalid');
            flag = false;
        } else
            $(this).removeClass('is-invalid');
    });
    return flag;
}