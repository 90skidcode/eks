let html = `<nav class="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
<div class="navbar-container d-flex content">
    <div class="bookmark-wrapper d-flex align-items-center">
        <ul class="nav navbar-nav bookmark-icons">
            <img src="../../asst/img/logo-bg.png" class="w-100px">
        </ul>
    </div>
    <ul class="nav navbar-nav align-items-center ms-auto">
        <li class="nav-item d-none d-lg-block"><a href="../../pages/dashboard/dashboard.html" class="nav-link nav-link-style"><i class="ficon"
            data-feather="home"></i></a></li>
            <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-style"><i class="ficon"
            data-feather="share-2"></i></a></li>
            <li class="nav-item d-none d-lg-block"><a href="../../pages/add/add.html" class="nav-link nav-link-style"><i class="ficon"
            data-feather="plus"></i></a></li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ficon" data-feather="grid"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end company-menu" aria-labelledby="dropdown-flag">
             
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="dropdown-setting" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ficon" data-feather="settings"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end setting-menu" aria-labelledby="dropdown-setting">
             
            </div>
        </li>
            <li class="nav-item d-none d-lg-block"><a href="../../pages/setting/setting.html" class="nav-link nav-link-style"><i class="ficon"
            data-feather=""></i></a></li>
        <li class="nav-item dropdown dropdown-language">
            <a class="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="selected-language"></span></a>
            <div class="dropdown-menu dropdown-menu-end company-list" aria-labelledby="dropdown-flag">
              
            </div>
        </li>
        
        <li class="nav-item dropdown dropdown-user">
            <a class="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="user-nav d-sm-flex d-none"><span class="user-name fw-bolder">1000120</span><span class="user-status">Admin</span></div>
                <span class="avatar">
                <span 
                class="avatar-status-online"></span></span>
            </a>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
                <a class="dropdown-item" href="../../index.html"><i class="me-50"
                        data-feather="power"></i> Logout</a>
            </div>
        </li>
    </ul>
</div>
</nav>
`;
let user = '';

$(document).ready(function() {
    $('body').prepend(html);
    let user = JSON.parse(localStorage.getItem('user'));

    let data = {
        "list_key": "getUserDashboard",
        "company_id": user[0].company_id,
        "user_id": user[0].user_id,
    }
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "menuDom" });
});

function menuDom(params) {
    let menu = '';
    let company = '';

    params.result.company.forEach(e => {
        company += `<a  data-id="${e.company_master_id}" class="dropdown-item company">${e.company_master}</a>`;
    });

    /*params.result.forms.forEach(e => {
        menu += `<a  href='../table/table.html?id=${e.master_table_id}' class="dropdown-item">${e.master_form_name}</a>`;
    });*/

    $('.company-list').html(company);
    //$('.company-menu').html(menu);
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

$(document).on('click', '.company', function() {
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

function listform(params) {
    let menu = '';
    params.forEach(e => {
        menu += `<a  href='../table/table.html?id=${e.master_table_id}' class="dropdown-item">${e.master_form_name}</a>`;
    });
    $('.company-menu').html(menu);
}