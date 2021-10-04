$((function() {
    "use strict";
    var e = $(".datatables-basic"),
        t = $(".dt-date"),
        a = $(".dt-complex-header"),
        s = $(".dt-row-grouping"),
        l = $(".dt-multilingual"),
        o = "../../../app-assets/";

    var n = e.DataTable({
        columns: [
            { data: "id" },
            { data: "full_name" },
            { data: "email" },
            { data: "start_date" },
            { data: "salary" },
            { data: "status" },
            {
                data: "id",
                render: function(data, type) {
                    return `<i class="ficon text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#modals-slide-in" data-feather="edit"></i>
                    <i class="ficon text-primary cursor-pointer " data-feather="trash"></i>`;
                },
            }
        ],
        dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        data: [{
                "responsive_id": "",
                "id": 1,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            },
            {
                "responsive_id": "",
                "id": 2,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "",
                "salary": "",
                "age": "",
                "experience": "1 Year",
                "status": 'Absent'
            }, {
                "responsive_id": "",
                "id": 3,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 4,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 5,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 6,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 7,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 8,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 9,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 10,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 11,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 12,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 13,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            }, {
                "responsive_id": "",
                "id": 14,
                "avatar": "10-small.png",
                "full_name": "Mani",
                "post": "09/29/1990",
                "email": "09/29/1990",
                "city": "Krasnosilka",
                "start_date": "09:00",
                "salary": "18:00",
                "age": "",
                "experience": "1 Year",
                "status": 'Present'
            },
        ],
        lengthMenu: [7, 10, 25, 50, 75, 100],
        buttons: [{ extend: "collection", className: "btn btn-outline-secondary dropdown-toggle me-2", text: feather.icons.clipboard.toSvg({ class: "font-small-4 me-50" }) + "PDF" }, { text: feather.icons.plus.toSvg({ class: "me-50 font-small-4" }) + "Add New Record", className: "create-new btn btn-primary", attr: { "data-bs-toggle": "modal", "data-bs-target": "#modals-slide-in" }, init: function(e, t, a) { $(t).removeClass("btn-secondary") } }],
        language: { paginate: { previous: "&nbsp;", next: "&nbsp;" } }
    });
    $("div.head-label").html('<h6 class="mb-0">Attendance</h6>')
}));

$(document).on('click', '.dropdown-language .dropdown-item', function() {
    $('.selected-language').html($(this).text());

})