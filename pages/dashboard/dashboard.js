$(document).ready(function() {
    getreadyDashbord();
});

function getreadyDashbord() {
    let ch = '';
    (typeof(customerUrlid) != 'undefined' && customerUrlid) ? ch = customerUrlid: ch = user[0].company_id;
    (localStorage.getItem('company-id')) ? c = localStorage.getItem('company-id'): c = ch;
    let data = {
        "list_key": "getCompanyDashboard",
        "company_id": c
    }
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "dashboard" });
}

let up = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up text-success font-medium-1"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`;
let down = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-down text-danger font-medium-1"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>`;

up = '';
down = '';

function dashboard(params) {

    let cu = params.result.current_month;
    let pre = params.result.pre_month;
    let date = params.result.date;
    let dashboardHtml = ` 
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Current Month</th>
                        <th>Previous Month</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Hyd Oil Cons</div>
                            </div>
                        </td>
                        <td>
                            <div class="text-center">
                                <span class="fw-bolder mb-25">${setZeroForUndefined(cu.Hydralic)} ${setDate(date.Hydralic)}</span>
                                ${(cu.Hydralic >= pre.Hydralic) ? up : down}
                            </div>
                        </td>

                        <td>
                            <div class="text-center">
                                <span class="fw-bolder me-1">${setZeroForUndefined(pre.Hydralic)}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Lube Oil Cons</div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="text-center">
                                <span class="fw-bolder mb-25">${setZeroForUndefined(cu.Lube)}  ${setDate(date.Lube)}</span>
                                ${(cu.Lube >= pre.Lube) ? up : down}
                            </div>
                        </td>
                        <td>
                            <div class="text-center">
                                <span class="fw-bolder me-1">${setZeroForUndefined(pre.Lube)}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Coolant Consumption</div>
                            </div>
                        </td>

                        <td>
                        <div class="text-center">
                            <span class="fw-bolder mb-25">${setZeroForUndefined(cu.coolant_concentration)}   ${setDate(date.coolant_concentration)}</span>
                            ${(cu.coolant_concentration >= pre.coolant_concentration) ? up : down}
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <span class="fw-bolder me-1">${setZeroForUndefined(pre.coolant_concentration)}</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Abnormalities Created</div>
                            </div>
                        </td>

                        <td>
                            <div class="text-center">
                                <span class="fw-bolder mb-25">${setZeroForUndefined(cu.Corrected)}   ${setDate(date.Corrected)}</span>
                                ${(cu.Corrected >= pre.Corrected) ? up : down}
                            </div>
                        </td>
                        <td>
                            <div class="text-center">
                                <span class="fw-bolder me-1">${setZeroForUndefined(pre.Corrected)}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Abnormalities Closed</div>
                            </div>
                        </td>

                        <td>
                        <div class="text-center">
                            <span class="fw-bolder mb-25">${setZeroForUndefined(cu.Identified)}   ${setDate(date.Identified)}</span>
                            ${(cu.Identified >= pre.Identified) ? up : down}
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <span class="fw-bolder me-1">${setZeroForUndefined(pre.Identified)}</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Low % Machines Count</div>
                            </div>
                        </td>

                        <td>
                        <div class="text-center">
                            <span class="fw-bolder mb-25">${setZeroForUndefined(cu.coolant_concentration)}   ${setDate(date.coolant_concentration)}</span>
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <span class="fw-bolder me-1">${setZeroForUndefined(pre.coolant_concentration)}</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Low Level Machines</div>
                            </div>
                        </td>

                        <td>
                        <div class="text-center">
                            <span class="fw-bolder mb-25">${setZeroForUndefined(cu.oil_level_abnormality)}   ${setDate(date.oil_level_abnormality)}</span>
                            ${ up }
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <span class="fw-bolder me-1">${setZeroForUndefined(pre.oil_level_abnormality)}</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Leak Identified</div>
                            </div>
                        </td>

                        <td>
                        <div class="text-center">
                            <span class="fw-bolder mb-25">${setZeroForUndefined(cu.leak)}   ${setDate(date.leak)}</span>
                            ${ up }
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <span class="fw-bolder me-1">${setZeroForUndefined(pre.leak)}</span>
                        </div>
                    </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="text-center">
                                <div class="fw-bolder">Leak Arrested</div>
                            </div>
                        </td>

                        <td>
                        <div class="text-center">
                            <span class="fw-bolder mb-25">${setZeroForUndefined(0)}</span>
                            ${ up }
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <span class="fw-bolder me-1">${setZeroForUndefined(0)}</span>
                        </div>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>`;
    $('.card-company-table').html(dashboardHtml);
}

function setZeroForUndefined(params) {
    if (typeof(params) != 'undefined' && params) {
        return '<h5 class="counter">' + params + '</h5>';
    } else
        return '0';
}


function setDate(params) {
    if (params) {
        let p = params.split(" ");
        var timeString = p[1];
        var H = +timeString.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ' ' + ampm;
        return ` <p class="date-field"> ${p[0]}  ${timeString} </p>`
    } else
        return '';
}