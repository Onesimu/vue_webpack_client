require(['webuploader'], function(WebUploader){
	KindEditor.plugin('wxUploader', function(K) {
	    var editor = this, name = 'wxUploader';
	    // 点击图标时执行
	    editor.clickToolbar(name, function() {
	        dialog({
		        title:"批量上传图片",
		        id:"util-wxUploader",
		        fixed: true,
		        content: '<div class="webUploaderWrap pt15 localImage" id="KEUploadWrap">\
	                        <div id="KEUploadBtn" class="webuploader-container">点击上传</div>\
	                    </div>',
		        width:700,
		        cancel: false,
		        cancelValue:'取消',
		        okValue: '插入所有图片',
		        backdropOpacity:"0",
		        cancel:function(){},
		        ok: function () {
		        	var html = "";
		        	$("#KEUploadWrap .loaded").each(function(i,e){
		        		html += '<img src="'+$(e).data("url")+'?imageView2/2/w/800" />';
		        	});
		        	// KindEditor.instances[0].appendHtml(html);
		        	K.instances[K.instances.length-1].insertHtml(html);
		        }
		    }).showModal();

	        $.fn.multiImgUploader = function(options){
	        	var _this = $(this);
		        var uploader = WebUploader.create({
		            auto: true,
		            swf: '//res.qiakr.com/plugins/webuploader/Uploader.swf',
		            server: 'materialUpload.json',
		            pick: _this[0],
		            duplicate : true,
		            accept: {
		                title: 'Images',
		                extensions: 'gif,jpg,jpeg,png',
		                mimeTypes: 'image/*'
		            },
		            formData : {
		                'isContent' : 'true'
		            },
		            compress : false
		        });
		        var uploaderBtn = $(uploader.option('pick'));
		        uploader.on("uploadStart",function(file){
		            uploaderBtn.before('<div id="'+file.id+'" class="webuploader-container loaded"><span class="cancel">×</span><div class="webuploader-pick uploading"><div class="progressBar"><div class="progress" style="width:0%"></div></div></div></div>');
		        }).on("uploadProgress",function(file,percentage){
		            $("#"+file.id).find(".progress").css("width",percentage*100+'%');
		        }).on("uploadSuccess",function(file,response){
		            var url = response.result.url;
		            
		            $("#"+file.id).data("url",url).css({
		            	"background-image": "url("+url+")",
		            	'background-size': 'contain',
		            	'background-repeat': 'no-repeat',
	    						'background-position': 'center center',
		          }).find(".webuploader-pick").remove();
		            if(options.resultInput){
		                options.resultInput.val(url);
		            }
		            if(options.callback){
		                options.callback(url);
		            }
		        }).on("uploadError",function(file, reason,result){
		            toastr.warning("上传失败，请稍后再试或刷新页面重试");
		        }).on("error",function(msg){
		            toastr.warning(msg=="Q_TYPE_DENIED" ? "文件格式不正确" : msg);
		        });

		        _this.parent().on("click",".cancel",function(){
		            $(this).parent().fadeOut(300, function() {
		                $(this).remove();
		                if(options.removeCallback){
		                    options.removeCallback();
		                }
		                if(options.length){
		                    uploaderBtn.show();
		                }
		            });
		        });
	        };

	        $("#KEUploadBtn").multiImgUploader({});
	    });
	});
});