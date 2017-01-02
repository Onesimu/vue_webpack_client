import WebUploader from 'webuploader'
import {$alert, $confirm} from './dialog'

const uploadServer = location.protocol==="https:" ? 'https://up.qbox.me/' : 'http://up.qiniu.com/'
const cdn = "https://xycdn.xiyayungou.com/";
const cdnPrivate="http://export.qiakr.com/";

export const singleImgUploader = function(options){
    var _this = $("#"+options.id);
    var imgW = options.width || "160",
        imgH = options.height || "160";

    var uploader = WebUploader.create({
        auto: true,
        swf: '//res.qiakr.com/plugins/webuploader/Uploader.swf',
        server: uploadServer,
        pick:{
            id:_this[0],
            multiple : false
        },
        // runtimeOrder : "flash",
        duplicate : true,
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
        },
        formData : {
            'token' : options.token
        },
        compress : {
            width: options.limitLarger ? 1600 : 800,
            height: options.limitLarger ? 1600 : 800,
            quality: 90,
            allowMagnify: true,
            crop: false,
            preserveHeaders: true,
            noCompressIfLarger: true,
            // 单位字节，如果图片大小小于此值，不会采用压缩。
            compressSize: options.limitLarger ? 1024*1024 : 300*1024
        }
    });
    uploader.on("uploadStart",function(file){
        _this.find(".webuploader-pick").addClass("uploading").append('<div class="progressBar"><div class="progress" style="width:0%"></div></div>')
    }).on("uploadProgress",function(file,percentage){
        _this.find(".progress").css("width",percentage*100+'%');
    }).on("uploadSuccess",function(file,response){
        var url = cdn+response.hash+"?imageView2/1/w/"+imgW+"/h/"+imgH
        _this.css("background-image","url("+url+")").find(".webuploader-pick").removeClass("uploading").find(".progressBar").remove()
        if(options.resultInput){
            options.resultInput.val(cdn+response.hash);
        }
        if(options.callback){
            options.callback(cdn+response.hash);
        }
    }).on("uploadError",function(file, reason,result){
        $alert("上传失败，请稍后再试或刷新页面重试");
    }).on("error",function(msg){
        $alert(msg=="Q_TYPE_DENIED" ? "文件格式不正确" : msg);
    });
}

export const multiImgUploader = function(options){
    var _this = $("#"+options.id);
    var uploader = WebUploader.create({
        auto: true,
        swf: '//res.qiakr.com/plugins/webuploader/Uploader.swf',
        server: uploadServer,
        pick:{
            id:_this[0],
            multiple : true
        },
        // runtimeOrder : "flash",
        duplicate : true,
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
        },
        formData : {
            'token' : options.token
        },
        compress : false
    });
    uploader.on("uploadStart",function(file){
        if(options.length){
            var fileLength = $("#"+options.id).siblings(".loaded").length;
            if(fileLength >= ~~options.length){
                $alert("上传数量超过限制，不能超过"+options.length+"张");
                return false;
            }
            if(fileLength == ~~options.length-1){
                $("#"+options.id).hide();
            }
        }
        $("#"+options.id).before('<div id="'+file.id+'" class="webuploader-container loaded"><span class="cancel">×</span><div class="webuploader-pick uploading"><div class="progressBar"><div class="progress" style="width:0%"></div></div></div></div>');
    }).on("uploadProgress",function(file,percentage){
        $("#"+file.id).find(".progress").css("width",percentage*100+'%');
    }).on("uploadSuccess",function(file,response){
        var url = cdn+response.hash;
        $("#"+file.id).data("url",url).css("background-image","url("+url+"?imageView2/2/w/80/h/80)").find(".webuploader-pick").remove();
        if(options.resultInput){
            options.resultInput.val(response.hash);
        }
        if(options.callback){
            options.callback(url);
        }
    }).on("uploadError",function(){
        $alert("上传失败，请稍后再试或刷新页面重试");
    }).on("error",function(msg){
        $alert(msg=="Q_TYPE_DENIED" ? "文件格式不正确" : msg);
    });

    _this.parent().on("click",".cancel",function(){
        var url = $(this).parent().data("url");
        $(this).parent().fadeOut(300, function() {
            $(this).remove();
            if(options.removeCallback){
                options.removeCallback(url);
            }
            if(options.length && $("#"+options.id).siblings(".loaded").length<options.length){
                $("#"+options.id).show();
            }
        });
    });
}

export const singleFileUploader = function(options){
	var _this = $("#"+options.id);
    var uploader = WebUploader.create({
        auto: true,
        swf: '//res.qiakr.com/plugins/webuploader/Uploader.swf',
        server: uploadServer,
        // runtimeOrder : "flash",
        pick:{
            id:_this[0],
            multiple : false
        },
        duplicate : true,
        accept: {
            title: 'File',
            extensions : 'csv',
            mimeTypes: 'text/csv'
        },
        // formData : {"json":'{"type":3,"ext":"csv"}'}
        formData : {
            'token' : options.token
        }
    });
    uploader.on("uploadStart",function(file){
        _this.find(".webuploader-pick").addClass("uploading").append('<div class="progressBar"><div class="progress" style="width:0%"></div></div>')
    }).on("uploadProgress",function(file,percentage){
        _this.find(".progress").css("width",percentage*100+'%');
    }).on("uploadSuccess",function(file,response){
        _this.find(".webuploader-pick").removeClass("uploading").find(".progressBar").remove()
        var url = cdnPrivate+response.hash;
        $("#fileUrl").val(url);
        $("#loadedFileName").html(file.name);
        $(".submit").removeClass("disabled");
    }).on("uploadError",function(file, reason,result){
        $alert("上传失败，请稍后再试或刷新页面重试");
    }).on("error",function(msg){
        $alert(msg=="Q_TYPE_DENIED" ? "文件格式不正确，请上传.csv文件" : msg);
    });
};