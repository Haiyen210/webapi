$(document).ready(function() {
    // Phương thức GET => Lấy về danh sách danh mục
    $.get('https://localhost:44323/api/Employees', function(res) {
        var html = ''; // biển để chứa cấu trúc tr, td của bảng
        for (let i = 0; i < res.length; i++) {
            var employee = res[i];
            var gender = employee.gender == true ? 'Nu' : 'Nam';
            html += '<tr>';
            html += '<td>' + employee.id + '</td>';
            html += '<td>' + employee.name + '</td>';
            html += '<td>' + gender + '</td>';
            html += '<td>' + employee.birthday + '</td>';
            html += '<td>' + employee.address + '</td>';
            html += '<td>' + employee.position + '</td>';
            html += '<td>' + employee.departId + '</td>';
            html += '<td>';
            html += ' <button type="button" data-id="' + employee.id + '" class="btn btn-xs btnsuccess edit">Chỉnh sửa</button>';
            html += ' <button type="button" data-id="' + employee.id + '" class="btn btn-xs btnprimary show-detail">Xem</button>';
            html += '<button type="button" data-id="' + employee.id + '" class="btn btn-xs btn-danger delete ">Xóa</button>';
            html += '</td>';
            html += '</tr>';
        }
        // gán nội dung của biến html vào thẻ có id="list"
        $('#list').html(html);
    })

})
$(document).ready(function() {
    // Phương thức GET => Lấy về danh sách danh mục
    $.get('https://localhost:44323/api/Departments', function(res) {
        var html = ''; // biển để chứa cấu trúc tr, td của bảng
        for (let i = 0; i < res.length; i++) {
            var cat = res[i];
            html += '<option value="' + cat.id + '">' + cat.name + '</option>'
        }
        $('#department').html(html);
    })
})



//Add employee
$(document).ready(function() {
    // Các sự kiện khác để nguyên ở đây
    $('.add-new').click(function() {
        var _name = $('input#name').val(); // lãy dữ liệu trên input có id="name"
        var _gender = $('input[type="radio"][name="gender"]#gender:checked').val();
        var _birthday = $('input#birthday').val();
        var _address = $('input#address').val();
        var _position = $('input#position').val();
        var _departId = $('select#department').val();
        var _data = {
            name: _name,
            gender: _gender,
            birthday: _birthday,
            address: _address,
            position: _position,
            departId: _departId

        }; // chuẩn bị đối tượng dữ liệu
        $.ajax({
            url: 'https://localhost:44323/api/Employees',
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


var idDep;
//Sự kiện để gọi api chi tiết 1 bản ghi theo id
$(document).on('click', '.edit', function() {
    var $_this = $(this); // lưu lại phần tử hiện đang click
    var id = $(this).data('id'); // lấy giá trị từ thuộc tính data-id của thẻ button
    // Gọi ajax
    $.ajax({
        url: 'https://localhost:44323/api/Employees/' + id,
        type: 'GET', // Phương thức Delete => gọi api xóa danh mục
        success: function(res) {
            $('input#edit_id').val(res.id); // Gán dữ liệu cho input id="edit_id"
            $('input#edit_name').val(res.name); // Gán dữ liệu cho input id="edit_name"
            $('input#edit_gender').val(res.gender);
            $('input#edit_birthday').val(res.birthday);
            $('input#edit_address').val(res.address);
            $('input#edit_position').val(res.position);
            console.log(res.departId);
            idDep = res.departId;
            $('#modal-edit').modal('show'); // một modal có id=”modal-edit”
        }
    });
});

$(document).ready(function() {
    // Phương thức GET => Lấy về danh sách danh mục
    $.get('https://localhost:44323/api/Departments/', function(res) {
        var html = ''; // biển để chứa cấu trúc tr, td của bảng
        for (let i = 0; i < res.length; i++) {
            var cat = res[i];
            html += '<option value="' + cat.id + '">' + cat.name + '</option>'
        }
        $('#departments').html(html);
    })
})

$('.update').click(function() {
    var _id = $('input#edit_id').val(); // Gán dữ liệu cho input id="edit_id"
    var _name = $('input#edit_name').val(); // Gán dữ liệu cho input id="edit_name"
    var _gender = $('input[type="radio"][name="_editgender"]#edit_gender:checked').val();
    var _birthday = $('input#edit_birthday').val();
    var _address = $('input#edit_address').val();
    var _position = $('input#edit_position').val();
    var _departId = $('select#departments').val();
    // lãy dữ liệu trên input có id="edit_status"
    var _data = {
        id: _id,
        name: _name,
        gender: _gender,
        birthday: _birthday,
        address: _address,
        position: _position,
        departId: _departId

    }; // chuẩn bị đối tượng dữ liệu
    if (_name != '') {
        $.ajax({
            url: 'https://localhost:44323/api/Employees/' + _id,
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
        alert('Vui lòng nhập tên  nhân viên');
    }
});
// Sự kiện để gọi api xóa dữ liệu
$(document).on('click', '.delete', function() {
    var $_this = $(this); // lưu lại phần tử hiện đang click
    var id = $(this).data('id'); // lấy giá trị từ thuộc tính data-id của thẻ button
    // Gọi ajax
    $.ajax({
        url: 'https://localhost:44323/api/Employees/' + id,
        type: 'DELETE', // Phương thức Delete => gọi api xóa danh mục
        success: function(res) {
            $_this.closest('tr').remove(); // loại bỏ thẻ tr của dòng dữ liệu bị xóa
        }
    });
})