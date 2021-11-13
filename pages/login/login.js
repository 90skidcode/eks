VANTA.WAVES({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x884800

});
localStorage.clear();
$(document).on('click', '.login', function() {
    let data = {
        "query": "fetch",
        "key": "user",
        "column": {
            "*": "*"
        },
        "condition": {
            "user_name": $('#username').val(),
            "user_password": $("#password").val(),
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "login" })
});

function login(res) {
    localStorage.setItem('user', JSON.stringify(res));
    location.href = '../dashboard/dashboard.html';
}