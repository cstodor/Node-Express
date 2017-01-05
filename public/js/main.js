$(document).ready(function () {
    $('.btn-delete').on('click', deleteUser);
});

function deleteUser() {
    var conf = confirm("Are You Sure?");

    if (conf) {
        $.ajax({
            type: "DELETE", // Delete request
            url: "/users/delete/" + $(this).data("id") // URL of the deleted User grabbed from the HTML data-id attribute
        })
        window.location.replace("/"); // when deletion is done redirect to root
    } else {
        return false;
    }
}