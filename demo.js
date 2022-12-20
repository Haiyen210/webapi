$(document).ready(function() {
    // Phương thức GET => Lấy về danh sách danh mục
    $.get('https://localhost:44323/api/Departments', function(res) {
        var html = ''; // biển để chứa cấu trúc tr, td của bảng
        for (let i = 0; i < res.length; i++) {
            var cat = res[i];
            // var status = cat.status == 1 ? 'Hiển thị' : 'Đang ẩn';
            html += '<tr>';
            html += '<td>' + cat.id + '</td>';
            html += '<td>' + cat.name + '</td>';
            html += '<td>' + cat.totalEmployee + '</td>';
            html += '<td>';
            html += ' <button type="button" data-id="' + cat.id + '" class="btn btn-xs btnsuccess edit">Chỉnh sửa</button>';
            html += ' <button type="button" data-id="' + cat.id + '" class="btn btn-xs btnprimary show-detail">Xem</button>';
            html += '<button type="button" data-id="' + cat.id + '" class="btn btn-xs btn-danger delete ">Xóa</button>';
            html += '</td>';
            html += '</tr>';
        }
        // gán nội dung của biến html vào thẻ có id="list"
        $('#list').html(html);
    })
})

$(document).ready(function() {
    // Các sự kiện khác để nguyên ở đây
    $('.add-new').click(function() {
        var _name = $('input#name').val(); // lãy dữ liệu trên input có id="name"
        var totalEmployee = $('input#totalEmployee').val(); // lãy dữ liệu trên input có id="status"
        var _data = { name: _name, totalEmployee: totalEmployee }; // chuẩn bị đối tượng dữ liệu
        $.ajax({
            url: 'https://localhost:44323/api/Departments',
            type: 'POST', // Phương thức POST => gọi api thêm danh mục,
            data: JSON.stringify(_data), // truyền data name lên cho server,
            contentType: "application/json; charset=utf-8", // gửi dữ liệu tiến việt có dấu
            success: function(res) {
                location.reload(); // Load lại trang web
            },
            error: function(req, status, error) {
                console.log(status);
            }
        });
    })
})


//Sự kiện để gọi api chi tiết 1 bản ghi theo id
$(document).on('click', '.edit', function() {
    var $_this = $(this); // lưu lại phần tử hiện đang click
    var id = $(this).data('id'); // lấy giá trị từ thuộc tính data-id của thẻ button
    // Gọi ajax
    $.ajax({
        url: 'https://localhost:44323/api/Departments/' + id,
        type: 'GET', // Phương thức Delete => gọi api xóa danh mục
        success: function(res) {
            $('input#edit_id').val(res.id); // Gán dữ liệu cho input id="edit_id"
            $('input#edit_name').val(res.name); // Gán dữ liệu cho input id="edit_name"
            $('input#edit_totalEmployee').val(res.totalEmployee); // Gán dữ liệu cho input id="edit_status"
            $('#modal-edit').modal('show'); // một modal có id=”modal-edit”
        }
    });
});

$('.update').click(function() {
    var _id = $('input#edit_id').val(); // lãy dữ liệu trên input có id="edit_id"
    var _name = $('input#edit_name').val(); // lãy dữ liệu trên input có id="edit_name"
    var totalEmployee = $('input#edit_totalEmployee').val(); // lãy dữ liệu trên input có id="edit_status"
    var _data = { id: _id, name: _name, totalEmployee: totalEmployee }; // chuẩn bị đối tượng dữ liệu
    if (_name != '') {
        $.ajax({
            url: 'https://localhost:44323/api/Departments/' + _id,
            type: 'PUT', // Phương thức PUT => gọi api thêm danh mục,
            data: JSON.stringify(_data), // truyền data name lên cho server,
            contentType: "application/json; charset=utf-8",
            success: function(res) {
                location.reload();
            },
            error: function(req, status, error) {
                console.log(status);
            }
        });
    } else {
        alert('Vui lòng nhập tên danh mục');
    }
});
// Sự kiện để gọi api xóa dữ liệu
$(document).on('click', '.delete', function() {
    var $_this = $(this); // lưu lại phần tử hiện đang click
    var id = $(this).data('id'); // lấy giá trị từ thuộc tính data-id của thẻ button
    // Gọi ajax
    $.ajax({
        url: 'https://localhost:44323/api/Departments/' + id,
        type: 'DELETE', // Phương thức Delete => gọi api xóa danh mục
        success: function(res) {
            $_this.closest('tr').remove(); // loại bỏ thẻ tr của dòng dữ liệu bị xóa
        }
    });
})

$(document).ready(function() {
    // code phần hiển thị danh sách cứ để nguyên ở đây
    // Sự kiện để lấy ra chi tiết
    $(document).on('click', '.show-detail', function() {
        var id = $(this).data('id'); // lấy giá trị từ thuộc tính data-id của thẻ button
        // Phương thức GET => Lấy về chi tiết dah mục
        $.get('https://localhost:44323/api/Departments/' + id, function(res) {
            var _detail = '<p>Id: ' + res.id + '</p>';
            _detail += '<p>Id: ' + res.name + '</p>';
            $('#detail').html(_detail); // Gán giá trị vào cho phần tử có id=”detail”
            $('#modal-id').modal('show'); // Nổi modal lên
        });
    })
})