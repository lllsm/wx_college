<?php

namespace app\api\controller;

use app\common\controller\Api;
use think\Validate;
use fast\Random;
use app\common\library\Token;

class Wxuser extends Api
{
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['login', 'getuserinfo', 'inst'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['Userinfo', 'updateuser', 'inst','getPhone'];

    protected $appid = null;

    protected $appsecret = null;
    public function _initialize()
    {
        parent::_initialize();
        $inst = model('admin/Inst')->where('id', 1)->find();
        $this->success('success', $inst);
        $this->appid = $inst["appid"];
        $this->appsecret = $inst["appsecret"];
    }
    public function login()
    {
        $post = $this->request->param();
        // print_r($post);
        $rule = [
            'openid' => 'require|length:10,30'
        ];
        $msg = [
            'openid.require' => '缺少openid',
            'openid.length'  =>  'openid长度不符合',
        ];
        $v =  new Validate($rule, $msg);
        if (!$v->check($post)) {
            $this->error('登陆失败;' . $v->getError());
        }
        $u = model('admin/User')->where('openid', $post["openid"])->find();
        if ($u) {
            Token::clear($u["id"]);
            $this->auth->direct($u["id"]);
            $token = $this->auth->getToken();
            $u["token"] = $token;
            // $this->success('登陆成功',$this->auth->getUserinfo());
            $this->success('登陆成功', $token);
        } else {
            // 注册
            $username = $post['openid'];
            $password = Random::alnum(15);
            $this->auth->register($username, $password, '', '', [
                "openid" => $post["openid"]
            ]);
            // $this->success("注册成功！",$this->auth->token);

            $token = $this->auth->getToken();
            $u["token"] = $token;
            // $this->success('登陆成功',$this->auth->getUserinfo());
            $this->success('注册成功！', $token);
        }
    }
    public function Userinfo()
    {

        $token = $_SERVER['HTTP_TOKEN'];

        // $u = model('admin/User')->where('token',$token)->find();
        $user = $this->auth->getUser();

        $this->success('success', $user);
    }
    public function getuserinfo()
    {
        $code = $this->request->post("code");
        $grant_type = $this->request->post("grant_type");
        if ($code == "") {
            $this->error('no code request, sorry', '', -101);
        }
        if ($grant_type == "") {
            $this->error('no grant_type request, sorry', '', -102);
        }
        $appid = $this->appid;
        $appsecret = $this->appsecret;
        $url = "https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$appsecret&js_code=$code&grant_type=$grant_type";
        $authinfo = file_get_contents($url);
        // print_r($authinfo);
        $this->success('success', json_decode($authinfo));
    }
    public function updateuser()
    {
        $avatarUrl = $this->request->post("avatarUrl");
        $nickName = $this->request->post("nickName");
        $openid = $this->request->post("openid");
        $mobile = $this->request->post("mobile");

        $u = model('admin/User')->where('openid', $openid)->find();

        if ($u) {

            $this->auth->direct($u["id"]);
            // $u["avatarUrl"] = $avatarUrl;
            // $u["wxnickName"] = $nickName;
            // print_r($avatarUrl);

            $u->avatarUrl = $avatarUrl;
            $u->wxnickName = $nickName;
            $u->username = $openid;
            $u->nickname = $nickName;
            $u->mobile = $mobile;
            $u->email = $openid . '@qq.com';
            $u->save();
            // $token = $this->auth->getToken();
            // $u["token"] = $token;
            // $this->success('登陆成功',$this->auth->getUserinfo());
            $this->success('更新成功', '');
        } else {
            // 注册
            $username = $nickName;
            $password = Random::alnum(15);
            $this->auth->register($username, $password, '', '', [
                "openid" => $openid,
                "avatarUrl" => $avatarUrl,
                "wxnickName" => $nickName,
                "mobile"=> $mobile,
            ]);
            // $this->success("注册成功！",$this->auth->token);

            // $token = $this->auth->getToken();
            // $u["token"] = $token;
            // $this->success('登陆成功',$this->auth->getUserinfo());
            $this->success('注册成功！', '');
        }
    }
    public function inst()
    {
        //    $inst=$this->Db::table('fa_inst')->where('id',1)->find();
        $inst = model('admin/Inst')->where('id', 1)->find();
        $this->success('success', $inst);
    }
    public function decrypteddata()
    {
        //$_REQUEST=json_decode('{"errMsg":"getShareInfo:ok","iv":"UrXx9eOzR+1LF9WKYCY1vA==","encryptedData":"sP+dPqTuEgmU1mOIpapSoIfFWFIechNTu3T7bNgSX5j3TVGQfUTgiOAB1fvbBiSUfBr4ENUEIFXkmfupboqpzJGuSOCQdNdgXUO1pPg2yoTnNjccibI+fOXQiXoOEOebZ5mjOu7460\/i+WNTKu2SSA=="}',true);





        include_once('common/wxBizDataCrypt.php');
        $pc = new WXBizDataCrypt($appid, $sessionKey);
        $errCode = $pc->decryptData($encryptedData, $iv, $data);
        //$data=[];
        $data = json_decode($data, true);
        if ($errCode == 0) {
            // $data["openid"]=$member["openid"];
            // $data["session_key"]=$member["session_key"];
            $this->success('success', $data);
        } else {
            $this->success('err', $data);
        }
    }


    /**
     * 获取手机号
     */
    public function getPhone()
    {
        $appid = $this->appid;
        $appsecret = $this->appsecret;


        $iv = $this->request->post("iv", '', 'trim');
        $encryptedData = $this->request->post("encryptedData", '', 'trim');
        $sessionKey = $this->request->post('sessionKey');
        $datainfo = $this->auth->getUserinfo();
        if (!$iv || !$encryptedData) {
            $this->error('传参有误');
        }
        $errCode = self::decryptData($encryptedData, $iv, $data, $sessionKey, $appid);
        if ($errCode == 0) {
            $result = json_decode($data, true);
            if (isset($result['phoneNumber'])) {
                $user = \app\admin\model\User::get($datainfo['id']);
                $user->mobile = $result['phoneNumber'];
                $user->save();
                $this->success('获取成功', $result);
            } else {
                $this->error('号码获取失败');
            }
        } else {
            $this->error('用户信息更新失败');
        }
    }

    /**
     * 检验数据的真实性，并且获取解密后的明文.
     * @param $encryptedData string 加密的用户数据
     * @param $iv string 与用户数据一同返回的初始向量
     * @param $data string 解密后的原文
     *
     * @return int 成功0，失败返回对应的错误码
     */
    public function decryptData($encryptedData, $iv, &$data, $sessionKey, $appid)
    {
        if (strlen($sessionKey) != 24) {
            return -41001;
        }
        $aesKey = base64_decode($sessionKey);


        if (strlen($iv) != 24) {
            return -41002;
        }
        $aesIV = base64_decode($iv);

        $aesCipher = base64_decode($encryptedData);

        $result = openssl_decrypt($aesCipher, "AES-128-CBC", $aesKey, 1, $aesIV);

        $dataObj = json_decode($result);
        if ($dataObj == NULL) {
            return -41003;
        }
        if ($dataObj->watermark->appid != $appid) {
            return -41003;
        }
        $data = $result;
        return 0;
    }
}
