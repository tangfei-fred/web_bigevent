$(function() {
    // 1. 文章分类列表渲染
    initArtCateList();

    // 2. 添加文章分类 显示
    $("#addArtCate").on("click", function() {
        index = layui.layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });
    })

    // 3. 文章分类添加
    var index = null;
    $("body").on("submit", "#boxAddCate", function(e) {
        e.preventDefault();
        // console.log($(this).serialize())
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("新增文章分类失败！")
                }
                initArtCateList();
                layui.layer.msg("恭喜您，新增文章分类成功！");
                // 关闭添加区域
                layui.layer.close(index);
            }
        })
    })

    // 4. 修改文章分类 显示
    var index2 = null;
    $("tbody").on("click", ".btn-edit", function() {
        // 4.1 展示
        index2 = layui.layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        });
        // 4.2 渲染
        var Id = $(this).attr("data-id");
        $.ajax({
            url: '/my/article/cates/' + Id,
            success: function(res) {
                layui.form.val("dialog-edit", res.data);
            }
        })
    })

    // 5. 文章分类修改
    var index = null;
    $("body").on("submit", "#boxEditCate", function(e) {
        e.preventDefault();
        // console.log($(this).serialize())
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("修改文章分类失败！")
                }
                initArtCateList();
                layui.layer.msg("恭喜您，修改文章分类成功！");
                // 关闭修改区域
                layui.layer.close(index2);
            }
        })
    })

    // 6. 删除文章分类
    $("tbody").on("click", ".btn-delete", function() {
        // 必须写到对话框之外，里面的this就改变了
        var Id = $(this).attr("data-id");
        // 询问框
        layer.confirm('是否确认删除当前文章分类?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    initArtCateList();
                    layui.layer.msg("恭喜您，删除文章分类成功！");
                    layer.close(index);
                }
            })
        });
    })

    // 文章分类列表渲染函数封装
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                // 模板引擎渲染（传递对象，使用属性）
                var htmlStr = template("tpl-table", res)
                $("tbody").html(htmlStr)
            }
        })
    }
});