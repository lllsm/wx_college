define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'inst/index' + location.search,
                    add_url: 'inst/add',
                    edit_url: 'inst/edit',
                    del_url: 'inst/del',
                    multi_url: 'inst/multi',
                    import_url: 'inst/import',
                    table: 'inst',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'unicode', title: __('Unicode'), operate: 'LIKE'},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'summary', title: __('Summary'), operate: 'LIKE'},
                        {field: 'appid', title: __('Appid'), operate: 'LIKE'},
                        {field: 'appsecret', title: __('Appsecret'), operate: 'LIKE'},
                        {field: 'wechataccount', title: __('Wechataccount'), operate: 'LIKE'},
                        {field: 'merchant', title: __('Merchant'), operate: 'LIKE'},
                        {field: 'merchant_secret', title: __('Merchant_secret'), operate: 'LIKE'},
                        {field: 'smssign', title: __('Smssign'), operate: 'LIKE'},
                        {field: 'logo', title: __('Logo'), operate: 'LIKE'},
                        {field: 'logobackimg', title: __('Logobackimg'), operate: 'LIKE'},
                        {field: 'slogen', title: __('Slogen'), operate: 'LIKE'},
                        {field: 'tel', title: __('Tel'), operate: 'LIKE'},
                        {field: 'address', title: __('Address'), operate: 'LIKE'},
                        {field: 'openning', title: __('Openning'), operate: 'LIKE'},
                        {field: 'qrcode', title: __('Qrcode'), operate: 'LIKE'},
                        {field: 'poster', title: __('Poster'), operate: 'LIKE'},
                        {field: 'permit', title: __('Permit'), operate: 'LIKE'},
                        {field: 'instmobile', title: __('Instmobile'), operate: 'LIKE'},
                        {field: 'customerservicemobile', title: __('Customerservicemobile'), operate: 'LIKE'},
                        {field: 'banquan', title: __('Banquan'), operate: 'LIKE'},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        recyclebin: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    'dragsort_url': ''
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: 'inst/recyclebin' + location.search,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Name'), align: 'left'},
                        {
                            field: 'deletetime',
                            title: __('Deletetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate',
                            width: '130px',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'Restore',
                                    text: __('Restore'),
                                    classname: 'btn btn-xs btn-info btn-ajax btn-restoreit',
                                    icon: 'fa fa-rotate-left',
                                    url: 'inst/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'inst/destroy',
                                    refresh: true
                                }
                            ],
                            formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },

        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
