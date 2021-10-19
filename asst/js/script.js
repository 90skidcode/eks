$((function() {
    "use strict";
}));

$(document).on('click', '.dropdown-language .dropdown-item', function() {
    $('.selected-language').html($(this).text());
});