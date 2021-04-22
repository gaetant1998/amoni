var loader = {
    /**
     * 
     * @param {string} nameloader 
     * @param {strng} nameloader_quart 
     * @param {int} width 
     * @param {int} height 
     * @param {int} border 
     * @param {string or rgb or rgba} color 
     */
   quart : function(nameloader='loader', nameloader_quart='loader-quart', options={}){
       
       this.nameloader = nameloader ;
       this.nameloader_quart = nameloader_quart;
       this.options = Object.assign({}, {
            width : '40',
            height : '40',
            border : '6',
            color : 'black',
            bgcolor : 'rgba(0,0,0,.5)',
            duration : '1',
            limit : '5' 
        }, options);

        this.run = function(){
           var style = " \
           <style> \
           ."+this.nameloader+"{\
                   display: inline-block;\
                   width: "+this.options.width+"px; height: "+this.options.height+"px;\
                   vertical-align: middle;\
                   position: relative;\
               } \
               ."+this.nameloader_quart+"{\
                   border: "+this.options.border+"px solid "+this.options.bgcolor+";\
                   border-radius: 50%;\
               }\
               \
               ."+this.nameloader_quart+":after{\
                   content: '';\
                   position: absolute;\
                   top:-"+this.options.border+"px;left: -"+this.options.border+"px; right:-"+this.options.border+"px; bottom: -"+this.options.border+"px;\
                   border: "+this.options.border+"px solid transparent;\
                   border-top-color: "+this.options.color+"; \
                   border-radius: 50% ;\
                   animation: spin "+this.options.duration+"s linear "+this.options.limit+" ;\
               }\
               @keyframes spin{\
                   0%{ transform: rotate(0deg); }\
                   100%{ transform: rotate(360deg); }\
               \
           </style> ";

           $('body').html(style, true) ;
        }

        this.show_option = function(){
            return this.options;
        }
   },

    /*************************************************************************************\

                   Loader double cercle

    \*************************************************************************************/


   double : function(nameloader='loader', nameloader_double='loader-double', options={}){

       this.nameloader = nameloader ;
       this.nameloader_double = nameloader_double;
       this.options = Object.assign({}, {
        width : '40',
        height : '40',
        border : '6',
        color1 : 'black',
        color2 : 'black',
        color3 : 'black',
        color4 : 'black',  
        duration1 : 1,
        duration2 : 0,
        limit : 5,
        spin : 'spin'
        }, options);

       this.run = function(){
               var style = " \
               <style> \
                   ."+this.nameloader+"{ \
                       display: inline-block;\
                       width: "+this.options.width+"px;\ height: "+this.options.height+"px;\
                       vertical-align: middle;\
                       position: relative;\
                    }\
                    ."+this.nameloader_double+"{ \
                       border-radius: 50%;\
                       border: "+this.options.border+"px solid transparent;  \
                       border-top-color: "+this.options.color1+";\
                       border-bottom-color: "+this.options.color2+";\
                       animation: spin "+this.options.duration1+"s linear "+this.options.limit+" ;\
                    }\
                    \
                   ."+this.nameloader_double+":after{\
                       content: '';\
                       position: absolute;\
                       top: 5px; left: 5px; right: 5px; bottom: 5px;\
                       border: "+((this.options.border*2)/3)+"px solid transparent;   \
                       border-top-color: "+this.options.color3+"; border-bottom-color: "+this.options.color4+"; \
                       border-radius: 50% ;\
                       opacity: .6;\
                       animation: "+this.options.spin+" "+(this.options.duration1*this.options.duration2*2)+"s linear "+this.options.limit+" ;\
                   } \
               @keyframes spin{\
                   0%{ transform: rotate(0deg); }\
                   100%{ transform: rotate(360deg); }\
               }\
               @keyframes spinreverse{\
                   0%{ transform: rotate(0deg); }\
                   100%{ transform: rotate(-360deg); }\
               }\
           </style> " ;
           $('body').html(style, true) ;   
        }
       
        this.show_option = function(){
            return this.options;
        }
    },

    /*************************************************************************************\

                   Loader  cercle multiple

    \*************************************************************************************/

   circles : function(nameloader='loader', nameloader_circles='loader-circles', options={}){
       this.nameloader = nameloader ;
       this.nameloader_circles = nameloader_circles;      
       this.options = Object.assign({}, {
            width     : '50',
            height    : '50',
            border    : '5',
            color1    : 'black',
            color2    : 'black',
            color3    : 'black',
            duration1 : 1,
            duration2 : 0,
            duration3 : 0,
            limit     : 5,
        }, options);

       this.run = function(){
           var html = "\
           <style>\
               ."+this.nameloader+"{\
                   display: inline-block;\
                   width: "+this.options.width+"px; height: "+this.options.height+"px;\
                   vertical-align: middle;\
                   position: relative;\
               } \
               ."+this.nameloader_circles+"{\
                   border: "+this.options.border+"px solid transparent;\
                   border-top-color: "+this.options.color1+";\
                   animation: spin "+this.options.duration1+"s linear "+this.options.limit+";\
                   border-radius: 50%; \
               } \
               ."+this.nameloader_circles+":after{\
                   content: '';\
                   position: absolute;\
                   top: 5px ;\
                   bottom: 5px;\
                   left: 5px;\
                   right: 5px;\
                   border: "+((this.options.border)*2)/3+"px solid transparent;\
                   border-top-color: "+this.options.color2+";\
                   animation: spin "+(this.options.duration1)*this.options.duration2+"s linear "+this.options.limit+";\
                   border-radius: 50%; \
               }\
               ."+this.nameloader_circles+":before{\
                   content: '';\
                   position: absolute;\
                   top: 12px ;\
                   bottom: 12px;\
                   left: 12px;\
                   right: 12px;\
                   border: "+(this.options.border)/3+"px solid transparent;\
                   border-top-color: "+this.options.color3+";\
                   animation: spin "+(this.options.duration1)*this.options.duration3+"s linear "+this.options.limit+";\
                   border-radius: 50%; \
               }\
               \
               @keyframes spin{\
                   0%{ transform: rotate(0deg); }\
                   100%{ transform: rotate(360deg); }\
               }  \
           <style>";

           $('body').html(html, true) ;
        }
        
        this.show_option = function(){
            return this.options;
        }

    },

    /*************************************************************************************\

                   Loader  bar facebook

    \*************************************************************************************/

    bar : function(nameloader_bar='loader-bar', options={}){

       this.nameloader_bar = nameloader_bar ;
       this.options = Object.assign({}, {
            width    : '10',
            height   : '30',
            color1   : 'black',
            color2   : 'black',
            color3   : 'black',
            duration : 1,
            limit    : 5,
        }, options);

        this.run = function(){
	   var span = $('span').create();
	   var bar  = $('.'+nameloader_bar).get();
	   $(bar).add(span);

           var style = "\
           <style>\
               ."+this.nameloader_bar+":before{\
               content: '';\
               display: inline-block;\
               height: "+this.options.height+"px; width: "+this.options.width+"px;\
               background-color: "+this.options.color1+";\
               position: relative;\
               top:0px;\
               left: 0px;\
               animation: grow "+this.options.duration+"s linear "+this.options.limit+";\
           }\
           \
           ."+this.nameloader_bar+":after{\
               content: '';\
               display: inline-block;\
               height: "+this.options.height+"px; width: "+this.options.width+"px;\
               background-color: "+this.options.color2+";\
               position: relative;\
               top:0px; \
               left: 10px;\
               animation: grow "+this.options.duration+"s linear -0.75s "+this.options.limit+";\
           }\
           \
           ."+this.nameloader_bar+" span{\
               content: '';\
               display: inline-block;\
               height: "+this.options.height+"px; width: "+this.options.width+"px;\
               background-color: "+this.options.color3+";\
               position: relative;\
               top:0px; \
               left: 5px;\
               animation: grow "+this.options.duration+"s linear -0.5s "+this.options.limit+";\
           }\
           \
           @keyframes grow{\
               0%{ transform: scaley(0); opacity: 0;}\
               50%{ transform: scaley(1); opacity: 1;}\
               100%{ transform: scaley(0); opacity: 0;}\
           } \
           </style>";
   
           $('body').html(style, true) ;
        }

        this.show_option = function(){
            return this.options;
        }
    }

}
