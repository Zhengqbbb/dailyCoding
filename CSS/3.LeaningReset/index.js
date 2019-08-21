import '../css/reset.less'
import '../css/index.less?v=1'
import '../css/swiper.min.css'

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true

//var testData=new Date('2019/8/18 23:59:56')

 //var domain = "https://m.vmei.com";
//var domainmp = 'https://mp.vmei.com';

 var domain = "http://m.sephome.cn";
  var domainmp = "http://m.sephome.cn";

Vue.component('toast-box', {
  props: ['content'],
  template: '<div id="toast" class="m-toast">{{content}}</div>'
})
Vue.use(VueLazyload, {
  preLoad: 2.3,
  error: 'https://assets.vmei.com/web/m/act/2018/yearSells/image/replace.png',
  loading: 'https://assets.vmei.com/web/m/act/2018/yearSells/image/replace.png',
  attempt: 9
})
var app = new Vue({
  el: '#app',
  components: [],
  data: { 
    couponValue:'return818',//优惠券字段
    theme:'818sale',//本活动专题
    toast: '',
    platform: '',
    isLoading: true,
    isLogin: false,
    bridge: null,
    isIos: false,
    fixTab: false, //固定导航栏
    userShareKey: '', //分享人
    shareInfo: {
      title: '818提前购',
      content: '818提前购 每满200减20 每满350减35 8.16-8.20',
      url: "https://act.vmei.com/web/m/act/2019/818sale/dist/index.html?needSS=1",
      urlWechat: "https://m.vmei.com/special/2019/818sale/dist/index",
      imgUrl: "https://assets.vmei.com/web/m/act/2019/818sale/images/share_v1.jpg?v=1",
      imgUrlWechat: "https://assets.vmei.com/web/m/act/2019/818sale/images/share_v2.jpg?v=1"
    },
    prodList: [],
    isShowRule:false,
    time: {
      day: 0,
      hour: 0,
      min: 0,
      second: 0
    },
    timeStart: {
      day: 0,
      hour: 0,
      min: 0,
      second:0
    },
    channelId: 1135,//1114   
    channel_tabs: [],
    isShowDrop: false,
    coupons: [ 
      // {
      //   "canReceive": true,
      //   "id": 9065,
      //   "isNomore": false,
      //   "isReceive": false
      // },
      // {
      //     "canReceive": true,
      //     "id": 9066,
      //     "isNomore": false,
      //     "isReceive": false
      // }
  ],
    swiperListData: [], //当前秒杀
    secKilListData: [], //全部秒杀商品
    secKilListData1:[],
    secKilTimeList: {},
    swipList:{
      swiperListData1: [], 
      swiperListData2: [], 
      swiperListData3: [], 
      swiperListData4: [], 
      swiperListData5: [], 
      swiperListData6: []
    },
    itemIsStart:0,
    secKilIndex:0,
    nowTime:"",
    secKilHide:false,
    fixTab1:true, //浮动menu
    showFootDrop:false,
    secKillloadingData:true,
    prodListloadingData:true,
    checkPhoneX:false,
    showRule:false,
    activeClose:true
  },
  computed:{
    dayTime(){
      var obj=[];
       //var naoway=testData;
      var naoway=new Date();
      obj.push(
        {dayTime:'8月16日',time:'00:00'},
        {dayTime:'8月16日',time:'13:00'},
        {dayTime:'8月16日',time:'21:00'},
        {dayTime:'8月17日',time:'00:00'},
        {dayTime:'8月17日',time:'13:00'},
        {dayTime:'8月17日',time:'21:00'},
        {dayTime:'8月18日',time:'00:00'},
        {dayTime:'8月18日',time:'13:00'},
        {dayTime:'8月18日',time:'21:00'})
      console.log(obj);
      return obj;
    }
  },
  created() {
    let _this = this
    let href = location.href
    this.checkPhone();
    //判断在哪个端访问
    var ua = navigator.userAgent.toLowerCase();

    if (/sephome/.test(ua) || /唯美美妆/.test(ua)) {
      _this.platform = 'app';
      _this.app();
      _this.loadCoupon()
      if (/iphone/.test(ua)) {
        _this.isIos = true
      }
    } else if (ua.indexOf('micromessenger') != -1) {
      _this.platform = 'wechat';
    } else if (ua.indexOf('toutiao') != -1){
       _this.platform = 'toutiao';
    } else {
      _this.platform = 'other';
      _this.loadCoupon();
    }
    if (wx && wx.miniProgram) {
      wx.miniProgram.getEnv(function (res) {
        if (res.miniprogram) {
          _this.platform = 'miniApp';
          //domain = 'https://mp.vmei.com'   //一般用于红包或者优惠券
          wx.miniProgram.postMessage({
            data:{
              shareUrl: _this.shareInfo.url,
              shareTitle: _this.shareInfo.content,
              sharePic: _this.shareInfo.imgUrl
            }
          })
          _this.GminiApp=wx;
          _this.loadCoupon()
          return
        } else {
          _this.platform = 'wechat';
          _this.loadCoupon()
          _this.weChat();
          return
        }
      })
    }
  },
  mounted(){
    var _this=this;
    if (_this.platform == 'toutiao') {
      var timeId=setInterval(function(){
          if(typeof tt !=="undefined" && typeof tt.miniProgram !=="undefined"){
            clearInterval(timeId);
            //domain = 'https://mp.vmei.com'   //一般用于红包或者优惠券
            _this.GminiApp=tt;
            _this.loadCoupon();
            window.onhashchange=function(event){
              if(_this.isGoLink==0){
                  _this.GminiApp.miniProgram.switchTab({
                    url: "/pages/dresser/mall"
                  })
               }
            };
          }
      },30)
  }
    //获取秒杀时间列表
    _this.setSecKilTimeList();
    _this.getServiceTime(res=>{
      let nowTime = res;
       //let nowTime = testData.getTime();
      _this.nowTime=nowTime;
      
          //mouted完进入激活的时间点
          var timeIn='';
          //进入的是第几天的列表
          var selectTimeIn=0;
          var timeList = _this.secKilTimeList['8月16日'];

          if(nowTime>_this.secKilTimeList['8月16日'][2]){
            timeList = _this.secKilTimeList['8月17日'];
            selectTimeIn=1;
          }
          if(nowTime>_this.secKilTimeList['8月17日'][2]){
            timeList = _this.secKilTimeList['8月18日'];
            selectTimeIn=2;
          }
          if(nowTime>_this.secKilTimeList['8月18日'][2]){
            timeList = _this.secKilTimeList['8月19日'];
            selectTimeIn=3;
          }
          
          for(var i=0;i<timeList.length;i++){ 
              if(timeList[i]>nowTime){ 
                timeIn=i-1;
                //timeIn=i;
                break;
              } 
          }

          if([0,1,2,3,4,5,6,7,8,9,10].includes(selectTimeIn)){
            if(timeIn==="" && nowTime< new Date("2019/8/18 23:59:59").getTime()){
              timeIn=8;
            }else{
              timeIn=timeIn+selectTimeIn*3;
            }
          }

          if(timeIn===""){
            if(_this.nowTime>new Date("2019/8/18 23:59:59").getTime()){
               _this.secKilHide=true;
            }else{
              _this.secKilIndex=8;
            }
          }else if(timeIn==-1){
            _this.secKilIndex=0;
          }else{
            _this.secKilIndex=timeIn;
          }

      //秒杀的商品列表
      // _this.getSecKilListData(1124,function(secKilListData){   //test:951
      //   _this.secKilListData = secKilListData
      //   _this.getSecKilListData(1122,function(secKilListData1){
      //     for(var item of secKilListData1){
      //       _this.secKilListData.push(item);
      //     }
      //     _this.getSecKilListData(1123,function(secKilListData1){
      //       for(var item of secKilListData1){
      //         _this.secKilListData.push(item);
      //       }
      //       if(_this.secKilListData[ _this.secKilIndex]){
      //         _this.swiperListData = _this.secKilListData[ _this.secKilIndex].productList;
      //       }
      //       _this.secKillloadingData=false;
      //       setTimeout(()=> {
      //         if(_this.secKilIndex>2){
      //           document.getElementById("secKill-title").scrollLeft=(_this.secKilIndex-2)*100;
      //         }
      //         _this.changesecKill(_this.secKilIndex);
      //       },1000)
      //       _this.isLoading = false
      //       document.body.classList.remove("z-loading");
      //     })  
      //     })
      //   })  
      })

    //分会场swiper商品
    // _this.getSwiperGroupData(1065,1)
    // _this.getSwiperGroupData(1066,2)
    // _this.getSwiperGroupData(1067,3)
    // _this.getSwiperGroupData(1064,4)
    // _this.getSwiperGroupData(1078,5)
    // _this.getSwiperGroupData(1068,6)

    //获取商品数据
    axios.get(`${domain}/vmeiActivity/${this.channelId}/20181111`)
      .then(function (res) {
        if (res.data.success) {
          // let data = res.data.data.channelData
          // console.log(res.data.data.channelList)
          _this.channel_tabs=res.data.data.channelList;
          _this.channel_tabs.forEach((item,index) => {
            if(index==0){
              item.active = true;
            }else{
              item.active = false;
            }
          })
          _this.prodList = res.data.data.channelList;
          _this.prodListloadingData = false
        }
      })
      .catch(function (res) {
        console.log(res);
      })

    document.addEventListener('scroll', function (e) {
      let scrollHeight = document.body.scrollHeight
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (_this.fixTab) {
        if (scrollTop < 2150) {
          _this.fixTab = false
        }
      } else {
        if (scrollTop > 2150) {
          _this.fixTab = true
        }
      }
      let officeTop1=document.documentElement.clientHeight;
      if(!_this.fixTab1){
        if ((scrollHeight-scrollTop) > (officeTop1+500)) {
          _this.fixTab1 = true
        }
      } else {
        if ((scrollHeight-scrollTop) < (officeTop1+500)) {
          _this.fixTab1 = false
        }
      }
    });
    //七夕倒计时
    /*setInterval(()=>{
      let doubleSevenTime = new Date("2019/8/7 00:00:00").getTime()
      let timeStamp = (doubleSevenTime - _this.nowTime) / 1000;
      _this.activeCountDown(timeStamp)
    },1000)*/
  },
  methods: {
    goAll(url,type){
      if(type){
        //如果有type
        if (this.platform === 'wechat') {
          location.href = 'https://m.vmei.com/special/2019/'+url+'?type='+type
      } else if (this.platform === 'miniApp' || this.platform === 'toutiao') {
        let chatSessionKey = this.getQueryString('chatSessionKey') || ''
        location.href = 'https://act.vmei.com/web/m/act/2019/'+url+'.html?type='+type+'&chatSessionKey=' + chatSessionKey
        }
        else {
          location.href = 'https://act.vmei.com/web/m/act/2019/'+url+'.html?type='+type
        }
      }else{
        //没有type
      if (this.platform === 'wechat') {
          location.href = 'https://m.vmei.com/special/2019/'+url
      } else if (this.platform === 'miniApp' || this.platform === 'toutiao') {
        let chatSessionKey = this.getQueryString('chatSessionKey') || ''
        location.href = 'https://act.vmei.com/web/m/act/2019/'+url+'.html?chatSessionKey=' + chatSessionKey
      }
        else {
          location.href = 'https://act.vmei.com/web/m/act/2019/'+url+'.html'
        }
      }
    },
    goIndex(){
      if (this.platform === 'wechat' || this.platform === 'other') {
          location.href = 'https://m.vmei.com/'
      } else if (this.platform === 'miniApp' || this.platform == 'toutiao') {
        this.GminiApp.miniProgram.switchTab({
            url: "/pages/dresser/mall"
          })
      }   
    },
    goCoupon(){
      let theme=this.theme
      if (this.platform === 'wechat') {
          location.href = 'https://m.vmei.com/special/2019/'+theme+'/dist/coupon'
      } else if (this.platform === 'miniApp' || this.platform == 'toutiao') {
        let chatSessionKey = this.getQueryString('chatSessionKey') || ''
        location.href = 'https://act.vmei.com/web/m/act/2019/'+theme+'/dist/coupon.html?chatSessionKey=' + chatSessionKey
        }
        else {
          location.href = 'https://act.vmei.com/web/m/act/2019/'+theme+'/dist/coupon.html'
        }
    },
    checkPhone(){
      // iPhone X、iPhone XS
      let isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
      // iPhone XS Max
      let isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
      // iPhone XR
      let isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
      if(isIPhoneX || isIPhoneXSMax || isIPhoneXR){
        this.checkPhoneX=true;
      }
    },
    getSecKilListData(secID,fun){
      let _this=this;
      // 获取限时秒杀数据653
      axios.get(domain + `/vmeiActivity/${secID}/20181111`)
        .then(res=>{
          if (res.data.success) {
            let secKilListData = res.data.data.channelList
            secKilListData.forEach((item,index) => {
              item.productList.forEach((pro,index) => {
                pro.isStart = false
              })
            })
            fun(secKilListData);
          }
        })
        .catch(res=>{
          console.log(res);
        })
    },
    //分会场swiper
    getSwiperGroupData(secID,num){
      let _this=this;
      axios.get(domain + `/vmeiActivity/${secID}/20181111`)
        .then(res=>{
          if (res.data.success) {
            _this.swipList['swiperListData'+num] = res.data.data.channelList[0].productList
          }
        })
        .catch(res=>{
          console.log(res);
        })
    },
    setSecKilTimeList(){
      let array=[16,17,18,19];
      let obj={};
      for (const value of array) {
        let key='8月'+value+'日';
        obj[key]=[];
        let letTime=['00:00:00','13:00:00','21:00:00'];
        for (const thisTime of letTime){
          let timeNum=new Date('2019/8/'+value+' '+thisTime).getTime()
           obj[key].push(timeNum);
        }
      }
      console.log(obj);
      this.secKilTimeList=obj;
    },
    getServiceTime(fun){
      let _this = this
      _this.isLoad = true
      //获取服务器时间
      axios.get(domain + `/serverTime`)
        .then(function (res) {
          console.log(res)
          if (res.data.success) {
            fun(res.data.data.serverTimes);
          }
        })
        .catch(function (res) {
          console.log(res);
        })
    },
    //活动时间
    activeCountDown(timeStamp){
      var _this = this;
      let timeLimitHours = Math.floor(timeStamp / 3600)
      let timeLimitMinutes = Math.floor((timeStamp - 3600 * timeLimitHours) / 60)

      let day = Math.floor(timeStamp / 86400)
      let hour = Math.floor(timeStamp / 3600)
      let min = Math.floor((timeStamp - 3600 * timeLimitHours) / 60)
      let second = Math.floor(timeStamp - 3600 * timeLimitHours - 60 * timeLimitMinutes)

      _this.timeStart.day = day
      _this.timeStart.hour = hour % 24
      _this.timeStart.min = min
      _this.timeStart.second = second

      if(day === 0 && hour === 0 && min === 0 && second === 0){
        clearInterval(_this.interval);
        _this.activeClose=false;
      }
    },
    //秒杀时间
    countDown(timeStamp,nowTime){
      var _this=this;
      let timeLimitHours = Math.floor(timeStamp / 3600)
      let timeLimitMinutes = Math.floor((timeStamp - 3600 * timeLimitHours) / 60)

      let day = Math.floor(timeStamp / 86400)
      let hour = Math.floor(timeStamp / 3600)
      let min = Math.floor((timeStamp - 3600 * timeLimitHours) / 60)
      let second = Math.floor(timeStamp - 3600 * timeLimitHours - 60 * timeLimitMinutes)

      _this.time.day = day
      _this.time.hour = hour % 24
      _this.time.min = min
      _this.time.second = second
      if (nowTime >= _this.secKilTimeList['8月19日'][0]) {
        _this.secKilHide = true;
      }

      if (day === 0 && hour === 0 && min === 0 && second === 0) { //时间结束
        clearInterval(_this.interval);
        if(_this.itemIsStart==0){
          _this.changesecKill(_this.secKilIndex);
        }else if(_this.itemIsStart==1){
          if(_this.secKilIndex>=2){
            //_this.changesecKill(_this.secKilIndex+1);
            setTimeout(function(){
              window.location.reload();
            },60000)
          }else{
             _this.changesecKill(_this.secKilIndex+1);
          }
        }
      }
    },
    showRule() {
      this.isShowRule = !this.isShowRule
    },
    showEntry() {
      this.isShowEntry = !this.isShowEntry
    },
    //toast调用
    showToast(content,time) {
      this.toast = content
      let _this = this
      setTimeout(function () {
        _this.toast = ''
      }, time || 2000)
    },
    // 切换限时秒杀
    changesecKill(index) {
      const _this = this;
      _this.secKilIndex = index;
      var swiperListData = _this.secKilListData[index].productList;
      console.log(index);
      var endtime=_this.secKilTimeList['8月16日'][index];
      if(index==2){
        var endtime1=_this.secKilTimeList['8月17日'][0];
      }else{
        var endtime1=_this.secKilTimeList['8月16日'][index+1];
      }
      if(index>2){
        endtime=_this.secKilTimeList['8月17日'][index-3];
        if(index==5){
          endtime1=_this.secKilTimeList['8月18日'][0];
        }else{
          endtime1=_this.secKilTimeList['8月17日'][index-2];
        }
      }
      if(index>5){
        endtime=_this.secKilTimeList['8月18日'][index-6];
        if(index==8){
          endtime1=new Date("2019/8/18 23:59:59").getTime();
        }else{
          endtime1=_this.secKilTimeList['8月18日'][index-5];
        }
      }  

      var countTime=0;
      if(_this.nowTime<endtime){
        _this.itemIsStart=0;
        countTime=endtime;
      }else if(_this.nowTime >=  endtime) {
        _this.itemIsStart = 1
        swiperListData.forEach((item,index) => {
          item.isStart = true;
        })
        if(_this.nowTime > endtime1) {
          _this.itemIsStart = 2
        }
        countTime=endtime1;
      }
      _this.swiperListData = swiperListData;
      clearInterval(_this.interval)
      _this.interval = setInterval(() => {
        let timeStamp = (countTime - _this.nowTime) / 1000;
        _this.nowTime = parseInt(_this.nowTime) + 1000;
        _this.countDown(timeStamp,_this.nowTime)
      }, 1000)
    },
    //一键领取
    getAllcoupon(){
      var lend=this.coupons.length-1;
      for(let i=0; i<this.coupons.length; i++){
        this.goCoupon(this.coupons[i].id,this.coupons[i],i+1);
      }
    },
    goCoupon(id,item,_index){
      var _this=this;
      setTimeout(function(){
        _this.getCoupon(id,item,_index);
      },1500*_index)
    },
    //获取优惠券
    getCoupon(id,item,type) {
      let _this = this
      let couponValue=_this.couponValue

      if(item.isNomore){
        return false
      }
      let url
      if (this.platform === 'wechat' || this.platform === 'other') {
        url = domain + '/acceptShare/act/coupon/send?property='+couponValue+'&id=' + id
      } else if (this.platform === 'miniApp'|| this.platform === 'toutiao') {
        url = domainmp + '/act/coupon/send?property='+couponValue+'&id=' + id +'&chatSessionKey=' + _this.getQueryString('chatSessionKey')
      } else if (this.platform === 'app'){
        _this.bridge.callHandler('loginBack', { 'needSendSS': true }, function (response) { });
        url = domain + '/acceptShare/act/coupon/send?property='+couponValue+'&id=' + id
      }
      axios.get(url,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        if (res.data.success) {
        	item.isReceive=true
        	item.canReceive=false
          _this.loadCoupon(type)
        }else{
          let theme=this.theme
        	if(res.data.msg=="尚未登录"){
              if(_this.platform == 'app'){
                _this.bridge.callHandler('loginBack', { 'needLogin': true }, function (response) { });
              }else if(_this.platform === 'miniApp'|| this.platform === 'toutiao'){
                location.href = `https://act.vmei.com/web/m/act/2019/${theme}/dist/index.html?needSS=1`;
              }else{
                location.href = `https://m.vmei.com/login?action=defaultBind&backUrl=https://m.vmei.com/special/2019/${theme}/dist/index`;
              }
            }
        }
        
        if(/0/.test(res.data.msg)){
          //剩下0张
          _this.showToast('领取成功！')
        }else{
          //还有优惠券可以领取
          _this.showToast(res.data.msg)
        }
      })
      .catch(function (res) {
        _this.showToast(res.data.msg)
      })
    },
    // 加载优惠券  无优惠券的活动屏蔽相关引用
    loadCoupon() {
      let url
      let _this = this
      let couponValue=_this.couponValue

      if (this.platform === 'wechat' || this.platform === 'other' || this.platform === 'app') {
        url = domain + '/acceptShare/act/coupon/list?property='+couponValue 
      } else if (this.platform === 'miniApp' || this.platform === 'toutiao') {
        url = domainmp + '/act/coupon/list?property='+couponValue+'&chatSessionKey=' + _this.getQueryString('chatSessionKey')
      }
      // url = 'http://mp.sephome.cn/act/coupon/list?property=womensDay&chatSessionKey=mp_f0e6f3d0-3a1b-4427-9d07-1241528df514'
      axios.get(url,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(function (res) {
         _this.coupons = res.data.data.list
        })
        .catch(function (res) {
          console.log(url+' '+res);
        })
    },
    getQueryString(e, t) {
      var n = new RegExp("(^|\\?|&)" + e + "=([^&]*)(&|$)", "i"),
        t = t || window.location.search,
        o = t.match(n);
      return null != o ? unescape(o[2]) : null
    },
    app() {
      let _this = this;
      let ss = _this.getQueryString("ss") || "";
      function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
          callback(WebViewJavascriptBridge)
        } else {
          document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
          }, false)
        }
      }
      connectWebViewJavascriptBridge(function (bridge) {
        _this.bridge = bridge;
        _this.initShareParams(bridge)
        bridge.init(function (message, responseCallback) {
          _this.isLogin = message
          var ss = message.ss;
          if (ss) {
            axios.post(domain + '/login/d?ss=' + ss)
              .then(function (res) {
                _this.test = res.data.data
                if (!res.data.success) {
                  bridge.callHandler('loginBack', { 'needLogin': true }, function (response) { });
                }
                _this.userShareKey = res.data.data.userShareKey || ''
                //_this.initShareParams(bridge)
                //_this.loadCoupon()
              })
              .catch(function (res) {
                console.log(res);
              })
          }
        });
        //bridge.callHandler('loginBack', { 'needSendSS': true }, function (response) { });
      })
    },
    weChat() {
      var _this = this
      // document.getElementById('recommendown').style.display = 'block'

      let form = new FormData()
      form.append('currUrl', window.location.href)
      axios.post('https://m.vmei.com/openapi/jssdk/getConfig', form)
        .then(function (res) {
          t(res.data)
        })
        .catch(function (res) {
          console.log(res);
        })
      wx.ready(function () {
        axios.get(domain + `/heySephome`)
          .then(function (res) {
            if (res.data.data.loggedIn) {
              _this.loadCoupon()
              if (res.data.data.isVip) { //如果登录成功且是VIP
                _this.userShareKey = res.data.data.userShareKey
              }
              //微信端分享
              wx.onMenuShareAppMessage({
                title: _this.shareInfo.title,
                desc: _this.shareInfo.content,
                link: _this.shareInfo.urlWechat + '?uskey=' + _this.userShareKey,
                imgUrl: _this.shareInfo.imgUrlWechat, // 分享图标
                success: function () {
                  console.log('分享成功')
                }
              })
            } else {
              ////如果登录成功且是VIP
              wx.onMenuShareAppMessage({
                title: _this.shareInfo.title,
                desc: _this.shareInfo.content,
                link: _this.shareInfo.urlWechat,
                imgUrl: _this.shareInfo.imgUrlWechat, // 分享图标
                success: function () {
                  console.log('分享成功')
                }
              })
            }
          })
          .catch(function (res) {
            console.log(res);
          })
      })
      function t(t) {
        wx.config({
          debug: false,
          appId: t.appId,
          timestamp: t.timestamp,
          nonceStr: t.noncestr,
          signature: t.signature,
          jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "launch3rdApp", "openCard", "openAddress"]
        })
      }
    },
    miniApp() {},
    //初始化分享
    initShareParams(bridge) {
      var _this = this;
      var options = {
        callType: "needSharePage",
        params: {
          shareType: "shareAction",
          shareTitle: _this.shareInfo.title,
          shareContent: _this.shareInfo.content,
          sharePic: _this.shareInfo.imgUrl,
          shareUrl: _this.shareInfo.urlWechat + '?uskey=' + _this.userShareKey,
          isOnlyMiniapp: true,
          miniapp: {
            appId: "gh_5b08b212e368",
            title: _this.shareInfo.title,
            pic: _this.shareInfo.imgUrl,
            link: _this.shareInfo.url,
            content: _this.shareInfo.content,
            path: "pages/webView/base/index?url=" + encodeURIComponent(_this.shareInfo.url)
          }
        }
      };
      bridge.callHandler("AppJSBack", options, function (response) { });
    },
    goToIndex() {
      // location.href = 'https://act.vmei.com/web/m/act/2018/yearSells/index.html'
    },
    // 跳转红包购买页面
    goToRedBag() {
      let _this = this
      if (_this.platform === 'miniApp' || _this.platform == 'toutiao') {
        _this.GminiApp.miniProgram.navigateTo({ url: "/pages/packageMain/pages/yearSells/redBagList" })
        return
      } else if (_this.platform === 'wechat') {
        location.href = domain + '/web/m/act/2019/DoubleSeven/dist/redBag.html'
      } else {
        location.href = domain + '/web/m/act/2019/DoubleSeven/dist/redBag.html'
      }
      //location.href = 'http://m.sephome.cn' + '/web/m/act/2018/yearSells/redBag.html'
    },
    //时间戳转换
    timestampToTime(timestamp) {
      const _this = this;
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      // var D = date.getDate() + ' ';
      var h = _this.formatNumber(date.getHours()) + ':';
      var m = _this.formatNumber(date.getMinutes()) + ':';
      var s = _this.formatNumber(date.getSeconds());
      return Y + M + D + h + m + s;
    },
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
   // 控制链接跳转
    goToPage(linkid, type,skuId,supplierId) {
      var _this = this;
      var linkHref
      if (type === 'product') {
        linkHref = `http://m.vmei.com/product/${linkid}.html`
      } else if (type === 'vmact') {
        linkHref = `https://act.vmei.com/web/m/act/vmact/${linkid}.html`
      }
      var linkPos = linkHref.lastIndexOf('/') + 1
      // linkPosLast = linkHref.lastIndexOf('ios'),
      let bridge = _this.bridge
      if (_this.platform === 'miniApp' || _this.platform === 'toutiao') {
        if (type === 'product') {
          if(skuId && skuId>0 && supplierId && supplierId>0){
            _this.GminiApp.miniProgram.navigateTo({ url: "/pages/goods/details?pid=" + linkid +'&skuId='+skuId+'&supplierId=' +supplierId })
          }else{
            _this.GminiApp.miniProgram.navigateTo({ url: "/pages/goods/details?pid=" + linkid })
          }
        } else if (type === 'vmact') {
          _this.GminiApp.miniProgram.navigateTo({ url: "/pages/packageMain/pages/dresser/vmact/vmactDetail?id=" + linkid })
        }
        return
      }
      if (!bridge) {
        location.href = linkHref
        return false
      }
      if (linkHref.indexOf('products') != -1) {
        var dataContent = _this.getAttribute('data-content') || _this.getQueryString('keyword', linkHref) || '';
        // IOS 代码有问题，这里做兼容
        if (dataContent === '' && (window.navigator.userAgent.toLowerCase().indexOf("iphone") != -1)) {
          dataContent = ' ';
        }
        var cid = _this.getQueryString('cid', linkHref) || ''
        var pv = _this.getQueryString('pv', linkHref) || ''
        // var TOPIC= getQueryString('TOPIC', linkHref)   || ''
        var stype = _this.getQueryString('stype', linkHref) || ''
        var stypeId = _this.getQueryString('stypeId', linkHref) || ''
        var title = _this.getQueryString('title', linkHref) || ''
        // stype 使用BRAND一直有问题，
        var options = {
          callType: 'searchProduct',
          params: {
            'cid': cid, 'pv': pv, 'keyword': dataContent, 'stype': 'TOPIC', 'stypeId': stypeId, 'liveList': '', 'title': title
          }
        }
        bridge.callHandler('AppJSBack', options, function (response) { })
        setTimeout(function () {
          bridge.callHandler('productJSBack', { 'searchProduct': dataContent }, function (response) { })
        }, 20)
      } else if (linkHref.indexOf('product') != -1 && linkHref.indexOf('liveshow') != -1) {
        var options = {
          callType: 'liveProduct',
          params: {
            'liveProductID': linkid
          }
        }
        bridge.callHandler('AppJSBack', options, function (response) { });
        setTimeout(function () {
          bridge.callHandler('productJSBack', { 'liveProductID': linkid }, function (response) { });
          setTimeout(function () {
            bridge.callHandler('AppJSBack', { 'liveProductID': linkid }, function (response) { });
          }, 20);
        }, 20);
      } else if (linkHref.indexOf('product') != -1 && linkHref.indexOf('exchange') != -1) {
        var options = {
          callType: 'pointsMallProduct',
          params: {
            'pointsMallProduct': linkid
          }
        }
        bridge.callHandler('AppJSBack', options, function (response) { });
        setTimeout(function () {
          bridge.callHandler('productJSBack', { 'pointsMallProduct': linkid }, function (response) { });
          // setTimeout(function() {
          //     bridge.callHandler('AppJSBack', {'pointsMallProduct': linkid}, function(response) {});
          // }, 20);
        }, 20);
      } else if (linkHref.indexOf('product') != -1) {
        if(skuId && skuId>0 && supplierId && supplierId>0){
          var options = {
            callType: 'product',
            params: {
              'productID': linkid,
              'skuId':skuId,
              'supplierId':supplierId
            }
          }
        }else{
          var options = {
            callType: 'product',
            params: {
              'productID': linkid,
            }
          }
        }
        bridge.callHandler('AppJSBack', options, function (response) { });
        setTimeout(function () {
          if(skuId && skuId>0 && supplierId && supplierId>0){
            bridge.callHandler('productJSBack', { 'productID': linkid,'skuId':skuId,'supplierId':supplierId }, function (response) { });
          }else{
             bridge.callHandler('productJSBack', { 'productID': linkid }, function (response) { });
          }
        }, 20);
      } else if (linkHref.indexOf('/web/m/act/vmact') != -1) {
        var options = {
          callType: 'vmActivity',
          params: {
            'activityId': linkid
          }
        }
        bridge.callHandler('AppJSBack', options, function (response) { });
        setTimeout(function () {
          bridge.callHandler('productJSBack', { 'activityId': linkid }, function (response) { });
        }, 20);
      }
    },
    setTab(index) {
      this.channel_tabs.forEach((item) => {
        item.active = false
      })
      this.channel_tabs[index].active = true
      this.isShowDrop = false
    },
    showDrop() {
      this.isShowDrop = !this.isShowDrop
    },
  },
  filters: {
    formatMoney(val) {
      let index = val.indexOf('.')
      return val.slice(0, index)
    },
    minisizePic(val) {
      return val + '?x-oss-process=image/resize,p_50'
    },
    formatDate(val) {
      if (val > 0 && val < 10) {
        return '0' + val
      }
      else {
        return val
      }
    }
  }
})





