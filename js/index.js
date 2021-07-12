$(function () {
  // 创建一个函数 调用函数渲染数据到页面
  var getBookList = function () {
    // 获取图书列表接口
    $.get('http://www.liulongbin.top:3006/api/getbooks', (res) => {
      if (res.status !== 200) return alert('获取图书列表失败');
      // 将图书信息存到一个空数组中
      var rows = [];
      // 遍历data数组，
      $.each(res.data, (i, item) => {
        rows.push(`<tr><td>${item.id}</td><td>${item.bookname}</td><td>${item.author}</td><td>${item.publisher}</td><td><a href="javascript:;" class="del" data-id="${item.id}">删除</a></td></tr>`)
      })
      // 将数据追加到tbody中 追加前先清空tbody里的内容
      $('#tbody').empty().append(rows.join())
    })
  }
  getBookList();

  // 通过代理的方式为动态添加的元素添加绑定事件
  $('#tbody').on('click', '.del', function () {
    var id = $(this).attr('data-id');
    $.get('http://www.liulongbin.top:3006/api/delbook', { id: id }, function (res) {
      if (res.status !== 200) return alert('删除图书失败');
      getBookList();
    })
  });

  // 点击按钮添加 提交图书信息
  $('#btn').on('click', () => {
    // 先判断input是否为空
    var bookname = $('#iptbookname').val().trim();
    var author = $('#iptauthor').val().trim();
    var publisher = $('#iptpublisher').val().trim();
    if (bookname.length == 0 || author.length == 0 || publisher.length == 0) return alert('请输入完整的图书信息');
    // post
    $.post('http://www.liulongbin.top:3006/api/addbook', { bookname: bookname, author: author, publisher: publisher }, (res) => {
      if (res.status !== 201) return alert('添加图书失败!');
      // 重新获取图书列表
      getBookList();
      // 清空输入框的值
      $('#iptbookname').val('');
      $('#iptauthor').val('');
      $('#iptpublisher').val('');
    })
  })
})
