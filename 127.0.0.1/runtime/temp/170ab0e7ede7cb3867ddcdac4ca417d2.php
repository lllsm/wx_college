<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:76:"C:\wwwroot\127.0.0.1\public/../application/admin\view\collegeclass\edit.html";i:1669091827;s:63:"C:\wwwroot\127.0.0.1\application\admin\view\layout\default.html";i:1669304756;s:60:"C:\wwwroot\127.0.0.1\application\admin\view\common\meta.html";i:1669304755;s:62:"C:\wwwroot\127.0.0.1\application\admin\view\common\script.html";i:1669304755;}*/ ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
<title><?php echo (isset($title) && ($title !== '')?$title:''); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="renderer" content="webkit">
<meta name="referrer" content="never">
<meta name="robots" content="noindex, nofollow">

<link rel="shortcut icon" href="/assets/img/favicon.ico" />
<!-- Loading Bootstrap -->
<link href="/assets/css/backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.css?v=<?php echo \think\Config::get('site.version'); ?>" rel="stylesheet">

<?php if(\think\Config::get('fastadmin.adminskin')): ?>
<link href="/assets/css/skins/<?php echo \think\Config::get('fastadmin.adminskin'); ?>.css?v=<?php echo \think\Config::get('site.version'); ?>" rel="stylesheet">
<?php endif; ?>

<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
<!--[if lt IE 9]>
  <script src="/assets/js/html5shiv.js"></script>
  <script src="/assets/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript">
    var require = {
        config:  <?php echo json_encode($config); ?>
    };
</script>

    </head>

    <body class="inside-header inside-aside <?php echo defined('IS_DIALOG') && IS_DIALOG ? 'is-dialog' : ''; ?>">
        <div id="main" role="main">
            <div class="tab-content tab-addtabs">
                <div id="content">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <section class="content-header hide">
                                <h1>
                                    <?php echo __('Dashboard'); ?>
                                    <small><?php echo __('Control panel'); ?></small>
                                </h1>
                            </section>
                            <?php if(!IS_DIALOG && !\think\Config::get('fastadmin.multiplenav') && \think\Config::get('fastadmin.breadcrumb')): ?>
                            <!-- RIBBON -->
                            <div id="ribbon">
                                <ol class="breadcrumb pull-left">
                                    <?php if($auth->check('dashboard')): ?>
                                    <li><a href="dashboard" class="addtabsit"><i class="fa fa-dashboard"></i> <?php echo __('Dashboard'); ?></a></li>
                                    <?php endif; ?>
                                </ol>
                                <ol class="breadcrumb pull-right">
                                    <?php foreach($breadcrumb as $vo): ?>
                                    <li><a href="javascript:;" data-url="<?php echo $vo['url']; ?>"><?php echo $vo['title']; ?></a></li>
                                    <?php endforeach; ?>
                                </ol>
                            </div>
                            <!-- END RIBBON -->
                            <?php endif; ?>
                            <div class="content">
                                <form id="edit-form" class="form-horizontal" role="form" data-toggle="validator" method="POST" action="">

    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('User_id'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-user_id" data-rule="required" data-source="user/user/index" data-field="nickname" class="form-control selectpage" name="row[user_id]" type="text" value="<?php echo htmlentities($row['user_id']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Class_name'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-class_name" class="form-control" name="row[class_name]" type="text" value="<?php echo htmlentities($row['class_name']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('College_name'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-college_name" class="form-control" name="row[college_name]" type="text" value="<?php echo htmlentities($row['college_name']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Class_intro'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <textarea id="c-class_intro" class="form-control " rows="5" name="row[class_intro]" cols="50"><?php echo htmlentities($row['class_intro']); ?></textarea>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('College_intro'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <textarea id="c-college_intro" class="form-control " rows="5" name="row[college_intro]" cols="50"><?php echo htmlentities($row['college_intro']); ?></textarea>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('College_image'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-college_image" class="form-control" size="50" name="row[college_image]" type="text" value="<?php echo htmlentities($row['college_image']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-college_image" class="btn btn-danger faupload" data-input-id="c-college_image" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp,image/webp" data-multiple="false" data-preview-id="p-college_image"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-college_image" class="btn btn-primary fachoose" data-input-id="c-college_image" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-college_image"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-college_image"></ul>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Class_pas'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-class_pas" class="form-control" name="row[class_pas]" type="text" value="<?php echo htmlentities($row['class_pas']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Is_pas_switch'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            
            <input  id="c-is_pas_switch" name="row[is_pas_switch]" type="hidden" value="<?php echo $row['is_pas_switch']; ?>">
            <a href="javascript:;" data-toggle="switcher" class="btn-switcher" data-input-id="c-is_pas_switch" data-yes="1" data-no="0" >
                <i class="fa fa-toggle-on text-success <?php if($row['is_pas_switch'] == '0'): ?>fa-flip-horizontal text-gray<?php endif; ?> fa-2x"></i>
            </a>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Class_ewm'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-class_ewm" class="form-control" size="50" name="row[class_ewm]" type="text" value="<?php echo htmlentities($row['class_ewm']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-class_ewm" class="btn btn-danger faupload" data-input-id="c-class_ewm" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp,image/webp" data-multiple="false" data-preview-id="p-class_ewm"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-class_ewm" class="btn btn-primary fachoose" data-input-id="c-class_ewm" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-class_ewm"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-class_ewm"></ul>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Checkstate'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            
            <div class="radio">
            <?php if(is_array($checkstateList) || $checkstateList instanceof \think\Collection || $checkstateList instanceof \think\Paginator): if( count($checkstateList)==0 ) : echo "" ;else: foreach($checkstateList as $key=>$vo): ?>
            <label for="row[checkstate]-<?php echo $key; ?>"><input id="row[checkstate]-<?php echo $key; ?>" name="row[checkstate]" type="radio" value="<?php echo $key; ?>" <?php if(in_array(($key), is_array($row['checkstate'])?$row['checkstate']:explode(',',$row['checkstate']))): ?>checked<?php endif; ?> /> <?php echo $vo; ?></label> 
            <?php endforeach; endif; else: echo "" ;endif; ?>
            </div>

        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Refreshtime'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-refreshtime" class="form-control datetimepicker" data-date-format="YYYY-MM-DD HH:mm:ss" data-use-current="true" name="row[refreshtime]" type="text" value="<?php echo $row['refreshtime']?datetime($row['refreshtime']):''; ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Weigh'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-weigh" class="form-control" name="row[weigh]" type="number" value="<?php echo htmlentities($row['weigh']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Status'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            
            <div class="radio">
            <?php if(is_array($statusList) || $statusList instanceof \think\Collection || $statusList instanceof \think\Paginator): if( count($statusList)==0 ) : echo "" ;else: foreach($statusList as $key=>$vo): ?>
            <label for="row[status]-<?php echo $key; ?>"><input id="row[status]-<?php echo $key; ?>" name="row[status]" type="radio" value="<?php echo $key; ?>" <?php if(in_array(($key), is_array($row['status'])?$row['status']:explode(',',$row['status']))): ?>checked<?php endif; ?> /> <?php echo $vo; ?></label> 
            <?php endforeach; endif; else: echo "" ;endif; ?>
            </div>

        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('State'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            
            <div class="radio">
            <?php if(is_array($stateList) || $stateList instanceof \think\Collection || $stateList instanceof \think\Paginator): if( count($stateList)==0 ) : echo "" ;else: foreach($stateList as $key=>$vo): ?>
            <label for="row[state]-<?php echo $key; ?>"><input id="row[state]-<?php echo $key; ?>" name="row[state]" type="radio" value="<?php echo $key; ?>" <?php if(in_array(($key), is_array($row['state'])?$row['state']:explode(',',$row['state']))): ?>checked<?php endif; ?> /> <?php echo $vo; ?></label> 
            <?php endforeach; endif; else: echo "" ;endif; ?>
            </div>

        </div>
    </div>
    <div class="form-group layer-footer">
        <label class="control-label col-xs-12 col-sm-2"></label>
        <div class="col-xs-12 col-sm-8">
            <button type="submit" class="btn btn-primary btn-embossed disabled"><?php echo __('OK'); ?></button>
            <button type="reset" class="btn btn-default btn-embossed"><?php echo __('Reset'); ?></button>
        </div>
    </div>
</form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/assets/js/require<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js" data-main="/assets/js/require-backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js?v=<?php echo htmlentities($site['version']); ?>"></script>
    </body>
</html>
