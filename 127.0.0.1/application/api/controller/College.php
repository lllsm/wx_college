<?php
namespace app\api\controller;
use app\common\controller\Api;
use think\Validate;
use fast\Random;
use app\common\library\Token;
use think\Db;
class College extends Api{
        // 无需登录的接口,*表示全部
        protected $noNeedLogin = ['msglist'];
        // 无需鉴权的接口,*表示全部
        protected $noNeedRight = ['*'];
        protected  $uid = null;

        public function _initialize(){
            parent::_initialize();
            $this->uid = $this->auth->id;
        }
        public function collegeclass(){

            $keyword = input('keyword');
			$checkstate = input('checkstate');
            $isd = input('isd');
            // echo('0'.$this->uid);
			
		if($keyword){
			
			//$list=Db::table('tb_collegeclass')->where('class_name|college_name|class_intro|college_intro','like','%$keyword%')->select();
            if($isd="all"){
                $list=Db::table('tb_collegeclass')
                ->where('class_name|college_name|class_intro|college_intro','like',"%$keyword%")
                ->where('checkstate',$checkstate)
                ->select();
            }else{
                if($checkstate=="all"){
                    $list=Db::table('tb_collegeclass')
                    ->where('class_name|college_name|class_intro|college_intro','like',"%$keyword%")
                    ->where('user_id',$this->uid)
                    ->select();
                }else{
                    $list=Db::table('tb_collegeclass')
                    ->where('class_name|college_name|class_intro|college_intro','like',"%$keyword%")
                    ->where('checkstate',$checkstate)
                    ->where('user_id',$this->uid)
                    ->select();
                }
            }

		}else{
            if($isd=="all"){
                $where = [
                    "checkstate"=>$checkstate
                ];
            }else{
                if($checkstate=="all"){
                    $where = [
                        "user_id"=>$this->uid,
                    ];
                }else{
                    $where = [
                        "user_id"=>$this->uid,
                        "checkstate"=>$checkstate
                    ];
                }
            }

            $list = model('admin/Collegeclass')->where($where)->select();
		}
		for($i=0;$i<count($list);$i++){
			$id=$list[$i]['id']+0;
			$list[$i]['img'] = model('admin/Classimg')->where('collegeclass_id',$id)->select();
		}
		$this->success('success',$list);


        }


        public function delclass(){
            $id = $this ->request ->post("id");
            // $data = Db::table('tb_collegeclass')->where('id',$id)->delete();
            $data = model('admin/Collegeclass')->destroy($id);
    
            if ($data) {
                $this->success('已删除');
            } else {
                $this->error('删除失败');
            }
    
        }

        public function addclass($id=null){
            $data = $this->request->post();
            $type = "新增";
            if(empty($id)){
                $res=model('admin/Collegeclass')->allowField(true)->save($data);

            }else{
                $type = "修改";
                $res=model('admin/Collegeclass')->allowField(true)->save($data,["id"=>$id]);
            }
            if($res){
                $this->success($type.'成功！');
            }else{
                $this->success($type.'失败！');
            }
            
        }
        public function classdetails(){
            $id = $this ->request ->post("id");
            $data = model('admin/Collegeclass')->find($id);
            $data['img']=model('admin/Classimg')->where('collegeclass_id',$id)->select();
            $this->success('success',$data);
        }

        public function msglist(){
            $class_id =  input('id');
            $keyword = input('keyword');
            $isd = input('isd');
			$checkstate = input('checkstate');
            $type = input('type');
            // $keyword = htmlspecialchars($keyword, ENT_QUOTES); //防sql注入

            // echo($type);

            if($keyword){
                if($isd="all"){
                    $list=Db::query("select a.*,b.username,b.nickname,b.wxnickName from tb_message a
                    INNER JOIN tb_user b ON a.user_id=b.id
                    where (a.msg_t LIKE ?) OR (b.wxnickName LIKE ?) AND a.collegeclass_id=? AND checkstate=? AND state = '1'",['%'.$keyword.'%','%'.$keyword.'%',$class_id,$checkstate]); 
                }else{
                    if($checkstate=="all"){
                        $list=Db::query("select a.*,b.username,b.nickname,b.wxnickName from tb_message a
                        INNER JOIN tb_user b ON a.user_id=b.id
                        where (a.msg_t LIKE ?) OR (b.wxnickName LIKE ?) AND a.collegeclass_id=? AND state = '1' AND a.user_id = $this->uid ",['%'.$keyword.'%','%'.$keyword.'%',$class_id,]); 
                    }else{
                        $list=Db::query("select a.*,b.username,b.nickname,b.wxnickName from tb_message a
                        INNER JOIN tb_user b ON a.user_id=b.id
                        where (a.msg_t LIKE ?) OR (b.wxnickName LIKE ?) AND a.collegeclass_id=? AND checkstate=? AND state = '1' AND a.user_id = $this->uid ",['%'.$keyword.'%','%'.$keyword.'%',$class_id,$checkstate]); 
                    }
                }

            }else{
                if($isd="all"){
                    $where = [
                        "checkstate"=>$checkstate,
                        "collegeclass_id"=>$class_id
                    ];
                }else{
                    if($checkstate=="all"){
                        $where = [
                            "user_id"=>$this->uid,
                            "collegeclass_id"=>$class_id
                        ];
                    }else{
                        $where = [
                            "user_id"=>$this->uid,
                            "checkstate"=>$checkstate,
                            "collegeclass_id"=>$class_id
                        ];
                    }
                }
                $list = model('admin/Message')->where($where)->select();


                if($type=='my'){
                    // $list=Db::query("select b.*,a.class_name from tb_collegeclass a 
                    // INNER JOIN tb_message b ON a.id = b.collegeclass_id
                    // WHERE  b.checkstate=? AND b.state = '1' AND b.user_id = $this->uid ",[$checkstate]); 

                    if($checkstate=='all'){
                        $list=Db::query("select b.*,a.class_name from tb_collegeclass a 
                        INNER JOIN tb_message b ON a.id = b.collegeclass_id
                        WHERE  b.state = '1' AND b.user_id = $this->uid "); 
                    }else{
                        $list=Db::query("select b.*,a.class_name from tb_collegeclass a 
                        INNER JOIN tb_message b ON a.id = b.collegeclass_id
                        WHERE  b.checkstate=? AND b.state = '1' AND b.user_id = $this->uid ",[$checkstate]); 
                    }
                }


            }
            for($i=0;$i<count($list);$i++){
                $id=$list[$i]['user_id']+0;
                $class_id = $list[$i]['id']+0;
                $list[$i]['user'] = model('admin/User')->where('id',$id)->find();
                $list[$i]['img'] = model('admin/Messageimg')->where('message_id',$class_id)->select();
            }

            $this->success('success',$list);
        }
        public function addmsg($id=null){
            $collegeclass_id = $this ->request ->post("collegeclass_id");
            $text_msg = $this ->request ->post("text_msg");
            $imagelist =json_decode(urldecode($this->request->param('imagelist')),true);
            // echo($imagelist);

            $type = "新增";
            if(empty($id)){
                $ress=model('admin/Message')->allowField(true)->save([
                    'user_id'=>$this->uid,
                    'collegeclass_id'=>$collegeclass_id,
                    'msg_t'=>$text_msg,
                    'checkstate'=>'A',
                ]);
                // var_dump($imagelist);
                $id=(Db::table('tb_message')->max('id'));
                $insert = [];
                if(count($imagelist)>0){
                    for ($i=0;$i<count($imagelist);$i++) { 
                        $img=$imagelist[$i]['img'];
                        $insert[] = [
                            'user_id'=>$this->uid,
                            'message_id'=>$id,
                            'msg_image'=>$img,
                            'pass_time'=>date("Y-m-d H:i:s"),
                            'checkstate'=>'A',
                        ];
                        // echo($img);

                    }
                    model('admin/messageimg')->saveAll($insert);
                }

            }else{
                $type = "修改";
                $ress=model('admin/Message')->allowField(true)->save([
                    'user_id'=>$this->uid,
                    'collegeclass_id'=>$collegeclass_id,
                    'msg_t'=>$text_msg,
                    'checkstate'=>'A',
                ],["id"=>$id]);
                model('admin/Messageimg')->delete(['message_id' => $id]);
                $imagelist=json_decode($imagelist,true);
                if(count($imagelist)>0){
                    foreach ($imagelist as $v) {
                        $img=$v['img'];
                        $res=model('admin/Messageimg')->allowField(true)->save([
                            'user_id'=>$this->uid,
                            'message_id'=>$collegeclass_id,
                            'msg_image'=>$img,
                            'pass_time'=>time(),
                            'checkstate'=>'A',
                        ]);
                    }
                }
            }
            if($ress){
                $this->success($type.'成功！');
            }else{
                $this->success($type.'失败！');
            }

        }
        public function delmsg(){
            $id = $this ->request ->post("id");
            // $data = Db::table('tb_collegeclass')->where('id',$id)->delete();
            $data = model('admin/Message')->destroy($id);
            $datas = model('admin/Messageimg')->destroy($id);
            if ($data||$datas) {
                $this->success('已删除');
            } else {
                $this->error('删除失败');
            }
        }
        public function addclassfile($id=null){

            $collegeclass_id = $this ->request ->post("collegeclass_id");
            $classfile = $this ->request ->post("classfile");
            $file_name = $this ->request ->post("file_name");

            $type = "新增";
            if(empty($id)){
                $res=model('admin/Classfile')->allowField(true)->save([
                    'user_id'=>$this->uid,
                    'collegeclass_id'=>$collegeclass_id,
                    'file_name'=>$file_name,
                    'class_file'=>$classfile,
                    'pass_time'=>date("Y-m-d H:i:s"),
                    'checkstate'=>'A',
                ]);

            }else{
                $type = "修改";
                $res=model('admin/Collegeclass')->allowField(true)->save([
                    'user_id'=>$this->uid,
                    'collegeclass_id'=>$collegeclass_id,
                    'file_name'=>$file_name,
                    'class_file'=>$classfile,
                    'pass_time'=>date("Y-m-d H:i:s"),
                    'checkstate'=>'A',
                ],["id"=>$id]);
            }
            if($res){
                $this->success($type.'成功！');
            }else{
                $this->success($type.'失败！');
            }
            
        }


        public function filelist(){
            $class_id =  input('id');
            $keyword = input('keyword');
			$checkstate = input('checkstate');
            $isd = input('isd');
            // $keyword = htmlspecialchars($keyword, ENT_QUOTES); //防sql注入

            // echo($keyword);

            if($keyword){
                if($isd == "all"){
                    $list=Db::query("select a.*,b.username,b.nickname,b.wxnickName from tb_classfile a
                    INNER JOIN tb_user b ON a.user_id=b.id
                    where ((a.file_name LIKE ?) OR (b.wxnickName LIKE ?)) AND a.collegeclass_id=? AND a.checkstate=? AND a.state = '1' AND a.user_id = $this->uid",['%'.$keyword.'%','%'.$keyword.'%',$class_id,$checkstate]); 
                }else{
                    if($checkstate=="all"){
                        $list=Db::query("select a.*,b.username,b.nickname,b.wxnickName from tb_classfile a
                        INNER JOIN tb_user b ON a.user_id=b.id
                        where ((a.file_name LIKE ?) OR (b.wxnickName LIKE ?)) AND a.collegeclass_id=? AND a.state = '1'",['%'.$keyword.'%','%'.$keyword.'%',$class_id]); 
                    }else{
                        $list=Db::query("select a.*,b.username,b.nickname,b.wxnickName from tb_classfile a
                        INNER JOIN tb_user b ON a.user_id=b.id
                        where ((a.file_name LIKE ?) OR (b.wxnickName LIKE ?)) AND a.collegeclass_id=? AND a.checkstate=? AND a.state = '1'",['%'.$keyword.'%','%'.$keyword.'%',$class_id,$checkstate]); 
                    }
 
                }
            }else{
                if($isd == "all"){
                    $where = [
                        // "user_id"=>$this->uid,
                        "collegeclass_id"=>$class_id,
                        "checkstate"=>$checkstate
                    ];
                }else{
                    if($checkstate=="all"){
                        $where = [
                            "user_id"=>$this->uid,
                        ];
                    }else{
                        $where = [
                            "user_id"=>$this->uid,
                            "checkstate"=>$checkstate
                        ];
                    }
                }
                $list = model('admin/Classfile')->where($where)->select();
            }
            for($i=0;$i<count($list);$i++){
                $id=$list[$i]['user_id']+0;
                $list[$i]['user'] = model('admin/User')->where('id',$id)->find();
            }

            $this->success('success',$list);
        }
        public function delfile(){
            $id = $this ->request ->post("id");
            // $data = Db::table('tb_collegeclass')->where('id',$id)->delete();
            $data = model('admin/Classfile')->destroy($id);
            if ($data) {
                $this->success('已删除');
            } else {
                $this->error('删除失败');
            }
        }

        public function addclassimg($id=null){
            $collegeclass_id = $this ->request ->post("collegeclass_id");
            $imagelist =json_decode(urldecode($this->request->param('imagelist')),true);
            // echo($imagelist);

            $type = "新增";
            if(empty($id)){

                if(count($imagelist)>0){
                    $img='';
                    foreach($imagelist as $v) { 
                        $img.=$v['img'].',';
                        // echo($img);
                    }
                    $img=trim($img,',');
                    $insert= [
                        'user_id'=>$this->uid,
                        'collegeclass_id'=>$collegeclass_id,
                        'class_images'=>$img,
                        'pass_time'=>date("Y-m-d H:i:s"),
                        'checkstate'=>'A',
                    ];
                    $res = model('admin/Classimg')->allowField(true)->save($insert);
                }

            }else{

                $type = "修改";
                $imagelist=json_decode($imagelist,true);
                if(count($imagelist)>0){
                    $img='';
                    foreach($imagelist as $v) { 
                        $img.=$v['img'].',';
                        // echo($img);
                    }
                    $img=trim($img,',');
                    $res=model('admin/Classimg')->allowField(true)->save([
                        'user_id'=>$this->uid,
                        'collegeclass_id'=>$collegeclass_id,
                        'class_images'=>$img,
                        'pass_time'=>time(),
                        'checkstate'=>'A',
                    ],["id"=>$id]);
                }
            }
            if($res){
                $this->success($type.'成功！');
            }else{
                $this->success($type.'失败！');
            }

        }
        public function delclassimg(){
            $id = $this ->request ->post("id");
            // $data = Db::table('tb_collegeclass')->where('id',$id)->delete();
            $data= model('admin/Classimg')->destroy($id);
            if ($data) {
                $this->success('已删除');
            } else {
                $this->error('删除失败');
            }
        }
    public function classimglist(){
        $class_id =  input('id');
        $isd = input('isd');
        $type = input('type');
        // $keyword = input('keyword');
        $checkstate = input('checkstate');
        if($isd=="all"){
            $where = [
                // "user_id"=>$this->uid,
                "collegeclass_id"=>$class_id,
                "checkstate"=>$checkstate
            ];
        }else{
            if($checkstate=="all"){
                $where = [
                    "user_id"=>$this->uid,
                    "collegeclass_id"=>$class_id,
                ];  
            }else{
                $where = [
                    "user_id"=>$this->uid,
                    "collegeclass_id"=>$class_id,
                    "checkstate"=>$checkstate
                ];  
            }

        }

        $list = model('admin/Classimg')->where($where)->select();
        if($type=='my'){
            // echo(111);
            if($checkstate=='all'){
                $list=Db::query("select b.*,a.class_name from tb_collegeclass a 
                INNER JOIN tb_classimg b ON a.id = b.collegeclass_id
                WHERE  b.state = '1' AND b.user_id = $this->uid "); 
            }else{
                $list=Db::query("select b.*,a.class_name from tb_collegeclass a 
                INNER JOIN tb_classimg b ON a.id = b.collegeclass_id
                WHERE  b.checkstate=? AND b.state = '1' AND b.user_id = $this->uid ",[$checkstate]); 
            }
        }
        $this->success('success',$list);

    }
}