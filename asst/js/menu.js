let html = `<nav class="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
<div class="navbar-container d-flex content">
    <div class="bookmark-wrapper d-flex align-items-center">
        <ul class="nav navbar-nav bookmark-icons">
            <img src="../../asst/img/logo-bg.png" class="w-100px">
        </ul>
    </div>
    <ul class="nav navbar-nav align-items-center ms-auto menu-bar">
       
    </ul>
</div>
</nav>
`;
let user = '';
var url = new URL(window.location.href);
var customerUrlid = url.searchParams.get("customer");
$(document).ready(function() {
    $('body').prepend(html);
    user = JSON.parse(localStorage.getItem('user'));
    let menuDom = ` <li class="nav-item  d-lg-block"><a href="../../pages/dashboard/dashboard.html" class="nav-link nav-link-style"><i class="ficon"
                        data-feather="home"></i></a>
                    </li>
                        <li class="nav-item  d-lg-block"><a class="nav-link nav-link-style share-link"><i class="ficon"
                        data-feather="share-2"></i></a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="dropdown-setting" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ficon" data-feather="settings"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end setting-menu" aria-labelledby="dropdown-setting">
                        
                        </div>
                    </li>
                        <li class="nav-item  d-lg-block"><a href="../../pages/add/add.html" class="nav-link nav-link-style"><i class="ficon"
                        data-feather="plus"></i></a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ficon" data-feather="grid"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end company-menu" aria-labelledby="dropdown-flag">
                        
                        </div>
                    </li>
                        <li class="nav-item d-none log-outs">
                            <a class="dropdown-item" href="../../index.html"><i class="ficon" data-feather="log-out"></i></a>
                        </li>
                    <li class="nav-item dropdown dropdown-language">
                        <a class="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="selected-language"></span></a>
                        <div class="dropdown-menu dropdown-menu-end company-list" aria-labelledby="dropdown-flag">
                        
                        </div>
                    </li>
                    
                    <li class="nav-item dropdown dropdown-user">
                        <a class="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="user-nav d-sm-flex "><span class="user-name fw-bolder">1000120</span><span class="user-status">Admin</span></div>
                            <span class="avatar">
                            <span 
                            class="avatar-status-online"></span></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
                            <a class="dropdown-item" href="../../index.html"><i class="me-50"
                                    data-feather="power"></i> Logout</a>
                        </div>
                    </li>`;



    if (typeof(customerUrlid) != 'undefined' && customerUrlid) {
        $('body').addClass('customer-view');
        localStorage.removeItem("user");
        localStorage.setItem('customer-id', customerUrlid);
        menuDom = ` <li class="nav-item  d-lg-block"><a href="../../pages/dashboard/dashboard.html?customer=${customerUrlid}" class="nav-link nav-link-style"><i class="ficon"
                        data-feather="home"></i></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ficon" data-feather="grid"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end company-menu" aria-labelledby="dropdown-flag">
                        
                        </div>
                    </li>`
    } else {
        if (user[0].user_type == '1') {
            menuDom = ` <li class="nav-item  d-lg-block"><a href="../../pages/dashboard/dashboard.html" class="nav-link nav-link-style"><i class="ficon"
            data-feather="home"></i></a>
        </li>
            <li class="nav-item  d-lg-block"><a class="nav-link nav-link-style share-link"><i class="ficon"
            data-feather="share-2"></i></a>
            </li>
            <li class="nav-item  d-lg-block"><a href="../../pages/add/add.html" class="nav-link nav-link-style"><i class="ficon"
            data-feather="plus"></i></a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ficon" data-feather="grid"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end company-menu" aria-labelledby="dropdown-flag">
                
                </div>
            </li>
    
        <li class="nav-item dropdown dropdown-language">
            <a class="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="selected-language"></span></a>
            <div class="dropdown-menu dropdown-menu-end company-list" aria-labelledby="dropdown-flag">
            
            </div>
        </li>
    
        <li class="nav-item dropdown dropdown-user">
            <a class="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="user-nav d-sm-flex "><span class="user-name fw-bolder">1000120</span><span class="user-status">Admin</span></div>
                <span class="avatar">
                <span 
                class="avatar-status-online"></span></span>
            </a>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
                <a class="dropdown-item" href="../../index.html"><i class="me-50"
                        data-feather="power"></i> Logout</a>
            </div>
        </li>`;
        }

    }

    $('.menu-bar').html(menuDom);
    let data = '';
    if (typeof(customerUrlid) != 'undefined' && customerUrlid) {
        data = {
            "list_key": "getUserDashboard",
            "company_id": customerUrlid,
        }
    } else {
        data = {
            "list_key": "getUserDashboard",
            "company_id": user[0].company_id,
            "user_id": user[0].user_id,
        }
    }

    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "menuDom" });

    let masterData = {
        "query": "master",
    }
    commonAjax('database.php', 'POST', masterData, '', '', '', { "functionName": "masterDom" });
});

function menuDom(params) {
    let menu = '';
    let company = '';
    if (typeof(customerUrlid) != 'undefined' && customerUrlid) {
        params.result.forms.forEach(e => {
            comapny_id_array.push(e.master_table_id);
            menu += `<a  href='../table/table.html?id=${e.master_table_id}&&customer=${customerUrlid}' class="dropdown-item">${e.master_form_name}</a>`;
        });
        $('.company-menu').html(menu);
        $('.selected-company-name').html(params.result.company[0].company_master);
    } else {
        params.result.company.forEach(e => {
            company += `<a  data-id="${e.company_master_id}" class="dropdown-item company">${e.company_master}</a>`;
        });
        $('.company-list').html(company);
        $('.selected-language').html(params.result.company[0].company_master);
        $('.user-name').html(params.result.user[0].user_id);
        $('.user-status').html(params.result.user[0].user_name);
        $('.selected-company-name').html(params.result.company[0].company_master);

        if (localStorage.getItem('company-id')) {
            c = localStorage.getItem('company-id');
            $('.company[data-id="' + c + '"]').trigger('click');
        } else
            $('.company-list .company').eq(0).trigger('click');
    }
}

function masterDom(params) {
    let masterMenu = ''
    let n = params.message.split(',');
    masterMenu += `<a  href='../user/user.html' class="dropdown-item">Employee</a>
    <a  href='../customer/customer.html' class="dropdown-item">Customer</a>`;

    $(n).each(function(i, v) {
        if (v)
            masterMenu += `<a  href='../master/master.html?id=${v}' class="dropdown-item">${removeUnWanted(v)}</a>`;
    });
    $('.setting-menu').html(masterMenu);
}

function removeUnWanted(params) {
    let r = params.replace('ma_', '');
    r = r.replace('_master', '');
    r = r.replace(/_/gi, ' ');
    return capitalizeFirstLetter(r);
}

$(document).on('click', '.company', function() {
    $('.company-menu').html(' ');
    let c = $(this).attr('data-id');
    localStorage.setItem('company-id', c);
    $('.selected-language').html($(this).text());
    $('.selected-company-name').html($(this).text());
    let tempdata = {
        "query": "fetch",
        "key": "master_table",
        "column": {
            "*": "*"
        },
        "condition": {
            'company_id': $(this).attr('data-id')
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', tempdata, '', '', '', { "functionName": "listform" });
});
var comapny_id_array = [];

function listform(params) {
    let menu = '';
    params.forEach(e => {
        comapny_id_array.push(e.master_table_id);
        menu += `<a  href='../table/table.html?id=${e.master_table_id}' class="dropdown-item">${e.master_form_name}</a>`;
    });
    $('.company-menu').html(menu);
}

$(document).on('click', '.share-link', function() {
    navigator.clipboard.writeText(window.location.origin + '/pages/dashboard/dashboard.html?customer=' + localStorage.getItem('company-id'));
    alert("Link Copied");
});