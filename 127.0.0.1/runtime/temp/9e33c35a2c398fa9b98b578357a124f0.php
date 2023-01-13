<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:68:"D:\wwwroot\127.0.0.1\public/../application/admin\view\inst\edit.html";i:1668582916;s:63:"D:\wwwroot\127.0.0.1\application\admin\view\layout\default.html";i:1669304756;s:60:"D:\wwwroot\127.0.0.1\application\admin\view\common\meta.html";i:1669304754;s:62:"D:\wwwroot\127.0.0.1\application\admin\view\common\script.html";i:1669304754;}*/ ?>
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
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Unicode'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-unicode" class="form-control" name="row[unicode]" type="text" value="<?php echo htmlentities($row['unicode']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Name'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-name" class="form-control" name="row[name]" type="text" value="<?php echo htmlentities($row['name']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Summary'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-summary" class="form-control" name="row[summary]" type="text" value="<?php echo htmlentities($row['summary']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Content'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <textarea id="c-content" class="form-control editor" rows="5" name="row[content]" cols="50"><?php echo htmlentities($row['content']); ?></textarea>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Appid'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-appid" class="form-control" name="row[appid]" type="text" value="<?php echo htmlentities($row['appid']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Appsecret'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-appsecret" class="form-control" name="row[appsecret]" type="text" value="<?php echo htmlentities($row['appsecret']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Wechataccount'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-wechataccount" class="form-control" name="row[wechataccount]" type="text" value="<?php echo htmlentities($row['wechataccount']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Merchant'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-merchant" class="form-control" name="row[merchant]" type="text" value="<?php echo htmlentities($row['merchant']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Merchant_secret'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-merchant_secret" class="form-control" name="row[merchant_secret]" type="text" value="<?php echo htmlentities($row['merchant_secret']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Smssign'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-smssign" class="form-control" name="row[smssign]" type="text" value="<?php echo htmlentities($row['smssign']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Logo'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-logo" class="form-control" size="50" name="row[logo]" type="text" value="<?php echo htmlentities($row['logo']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-logo" class="btn btn-danger faupload" data-input-id="c-logo" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp,image/webp" data-multiple="false" data-preview-id="p-logo"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-logo" class="btn btn-primary fachoose" data-input-id="c-logo" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-logo"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-logo"></ul>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Logobackimg'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-logobackimg" class="form-control" size="50" name="row[logobackimg]" type="text" value="<?php echo htmlentities($row['logobackimg']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-logobackimg" class="btn btn-danger faupload" data-input-id="c-logobackimg" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp,image/webp" data-multiple="false" data-preview-id="p-logobackimg"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-logobackimg" class="btn btn-primary fachoose" data-input-id="c-logobackimg" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-logobackimg"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-logobackimg"></ul>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Slogen'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-slogen" class="form-control" name="row[slogen]" type="text" value="<?php echo htmlentities($row['slogen']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Tel'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-tel" class="form-control" name="row[tel]" type="text" value="<?php echo htmlentities($row['tel']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Address'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class='control-relative'><input id="c-address" class="form-control" data-toggle="city-picker" name="row[address]" type="text" value="<?php echo htmlentities($row['address']); ?>"></div>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Openning'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-openning" class="form-control" name="row[openning]" type="text" value="<?php echo htmlentities($row['openning']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Qrcode'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-qrcode" class="form-control" size="50" name="row[qrcode]" type="text" value="<?php echo htmlentities($row['qrcode']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-qrcode" class="btn btn-danger faupload" data-input-id="c-qrcode" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp,image/webp" data-multiple="false" data-preview-id="p-qrcode"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-qrcode" class="btn btn-primary fachoose" data-input-id="c-qrcode" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-qrcode"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-qrcode"></ul>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Poster'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-poster" class="form-control" size="50" name="row[poster]" type="text" value="<?php echo htmlentities($row['poster']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-poster" class="btn btn-danger faupload" data-input-id="c-poster" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp,image/webp" data-multiple="false" data-preview-id="p-poster"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-poster" class="btn btn-primary fachoose" data-input-id="c-poster" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-poster"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-poster"></ul>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Permit'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-permit" class="form-control" size="50" name="row[permit]" type="text" value="<?php echo htmlentities($row['permit']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-permit" class="btn btn-danger faupload" data-input-id="c-permit" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp,image/webp" data-multiple="false" data-preview-id="p-permit"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-permit" class="btn btn-primary fachoose" data-input-id="c-permit" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-permit"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-permit"></ul>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Instmobile'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-instmobile" class="form-control" name="row[instmobile]" type="text" value="<?php echo htmlentities($row['instmobile']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Policy'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <textarea id="c-policy" class="form-control " rows="5" name="row[policy]" cols="50"><?php echo htmlentities($row['policy']); ?></textarea>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Agreement'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <textarea id="c-agreement" class="form-control " rows="5" name="row[agreement]" cols="50"><?php echo htmlentities($row['agreement']); ?></textarea>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Customerservicemobile'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-customerservicemobile" class="form-control" name="row[customerservicemobile]" type="text" value="<?php echo htmlentities($row['customerservicemobile']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Banquan'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-banquan" class="form-control" name="row[banquan]" type="text" value="<?php echo htmlentities($row['banquan']); ?>">
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
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Switch'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            
            <input  id="c-switch" name="row[switch]" type="hidden" value="<?php echo $row['switch']; ?>">
            <a href="javascript:;" data-toggle="switcher" class="btn-switcher" data-input-id="c-switch" data-yes="1" data-no="0" >
                <i class="fa fa-toggle-on text-success <?php if($row['switch'] == '0'): ?>fa-flip-horizontal text-gray<?php endif; ?> fa-2x"></i>
            </a>
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
