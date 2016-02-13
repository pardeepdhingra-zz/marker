(function($){
  var pluginName = 'marker';

  $.fn[pluginName] = function(find, options){
    if(find === undefined){
      throw "Search string not found."
    }
    //merge default settings with user settings
    var settings = $.extend(true, {}, $.fn[pluginName].defaults, options);

    return this.each(function(){
      var elem = $(this);
      var markup = elem.html();
      //default wrapper outer
      var wrapperLeft = '<span style="color: ' + settings.foreground + ';background:' + settings.background + ';">';
      var wrapperRight = '</span>';

      if(settings.ignoreCase){
        var index, indices = []
        var startIndex = 0;
        var searchStrLen = find.length;
        //find out all indexes of search keyword
        while((index = markup.toLowerCase().indexOf(find.toLowerCase(), startIndex)) !== -1){
          indices.push(index);
          startIndex = index + searchStrLen
        }

        if(indices.length > 0 ){
          var last_index = 0;
          var wrapper = '';
          //add wrapper to search keyword
          for(var i =0;i < indices.length; i++){
            wrapper += markup.substring(last_index, indices[i] - 1);
            wrapper += wrapperLeft + markup.substring(indices[i] - 1, indices[i] + searchStrLen) + wrapperRight;
            last_index = indices[i] + searchStrLen ;
          }
          wrapper += markup.substring(last_index, markup.length);
          markup = wrapper;
        }

      }else{
        var rex = new RegExp(find, 'g');
        markup = markup.replace(rex, wrapperLeft + find + wrapperRight);
      }
      //update new markup
      elem.html(markup);
    });
  };

  $.fn[pluginName].defaults = {
      foreground: "#ff0000",
      background: "#ffff00",
      ignoreCase: false
  };

}(jQuery));
