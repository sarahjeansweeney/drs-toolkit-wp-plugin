/**
 * JavaScript for the registration page.
 **/

 jQuery( document ).ready(function( $ ) {
  //variables for generating the lists of items
  var search_q = '';
  var search_page = 1;
  var search_params = {q:search_q, page:search_page};

  //enables tabs
 $("#tabs").tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
 $("#tabs-1").html('<h4>Tile Gallery</h4><br/><label for="search">Search for an item: </label><input type="text" name="search" id="search-tile" /><button class="themebutton" id="search-button-tile">Search</button><br/><button class="tile-options button"><span class="dashicons dashicons-admin-generic"></span></button><div class="hidden tile-options"><label for="tile-type">Type Layout Type</label><select name="tile-type" id="drstk-tile-type"><option value="pinterest">Pinterest style with caption below</option><option value="even-row">Even rows with caption on hover</option><option value="square">Even Squares with caption on hover</option></select><br/><label for="caption-align">Caption Text Alignment</label><select name="caption-align" id="drstk-tile-caption-align"><option value="center">Center</option><option value="left">Left</option><option value="right">Right</option></select><br/><label for="cell-height">Cell Height (auto for Pinterest style)</label><input type="number" value="200" name="cell-height"/></label><br/><label for="cell-width">Cell Width</label><input type="number" value="200" name="cell-width"/></label><p>Make the height and width the same for squares</p><br/><label for="drstk-tile-image-size">Image Size<select name="drstk-tile-image-size" id="drstk-tile-image-size"><option value="1">Largest side is 85px</option><option value="2">Largest side is 170px</option><option value="3">Largest side is 340px</option><option value="4" selected="selected">Largest side is 500px</option><option value="5">Largest side is 1000px</option></select></label><br/><div class="drstk-tile-metadata"><h5>Metadata for Captions</h5><label><input type="checkbox" name="Title" checked="checked"/>Title</label><br/><label><input type="checkbox" name="Creator,Contributor"/>Creator,Contributor</label><br/><label><input type="checkbox" name="Date created"/>Date Created</label><br/><label><input type="checkbox" name="Abstract/Description"/>Abstract/Description</label></div></div><div class="drs-items">Loading...</div><ol id="sortable-tile-list"></ol><div class="drs-pagination"></div><input type="hidden" class="selected-tile" />');


 //enables the tabs to get their content dynamically
 $("[id^=ui-id-]").on("click", function(e){
   var id = $(this).attr('id');
   id = id.substr(id.length - 1);
   search_params.q = '';
   search_params.page = 1;
   if (id == 4){
     $("#TB_ajaxContent #tabs-4").html('<div class="drs-items"></div><button class="video-options button"><span class="dashicons dashicons-admin-generic"></span></button><div class="hidden video-options"><label for="drstk-video-height">Height: <input type="text" name="drstk-video-height" id="drstk-video-height" />(Enter in pixels or %, Default is 270)</label><br/><label for="drstk-video-width">Width: <input type="text" name="drstk-video-width" id="drstk-video-width" />(Enter in pixels or %, Default is 100%)</label><br/></div><ol id="sortable-video-list"></ol><div class="drs-pagination"></div>');
     $("#TB_ajaxContent #tabs-4").prepend('<h4>Media Playlist</h4><input type="hidden" class="selected-video" />');
     get_updated_items(search_params, 'video');
   }
   if (id == 3){
     $("#TB_ajaxContent #tabs-3").html('<h4>Item</h4><br/><label for="search">Search for an item: </label><input type="text" name="search" id="search-item" /><button class="themebutton" id="search-button-item">Search</button><br/><button class="zoom-options button"><span class="dashicons dashicons-admin-generic"></span></button><div class="hidden zoom-options"><label for="drstk-item-align">Image Alignment<select id="drstk-item-align" name="drstk-item-align"><option value="left">Left</option><option value="right">Right</option><option value="center">Center</option></select></label><br/><label for="drstk-item-caption-align">Caption Alignment<select id="drstk-item-caption-align" name="drstk-item-caption-align"><option value="left">Left</option><option value="right">Right</option><option value="center" selected="selected">Center</option></select></label><br/><label for="drstk-item-image-size">Image Size<select name="drstk-item-image-size" id="drstk-item-image-size"><option value="1">Largest side is 85px</option><option value="2">Largest side is 170px</option><option value="3">Largest side is 340px</option><option value="4" selected="selected">Largest side is 500px</option><option value="5">Largest side is 1000px</option></select></label><br/><label for="drstk-item-zoom"><input id="drstk-item-zoom" name="drstk-item-zoom" value="yes" type="checkbox" />Enable zoom</label><br/><label for="drstk-item-zoom-inner"><input id="drstk-item-zoom-inner" name="drstk-item-zoom-inner" value="yes" type="checkbox" />Zoom inside image</label><br/><label for="drstk-item-zoom-window">Zoom position (outside image)<select name="drstk-item-zoom-window" id="drstk-item-zoom-window"><option value="0">Select Position</option><option value="1">Top Right</option><option value="2">Middle Right</option><option value="3">Bottom Right</option><option value="4">Bottom Corner Right</option><option value="5">Under Right</option><option value="6">Under Middle</option><option value="7">Under Left</option><option value="8">Bottom Corner Left </option><option value="9">Bottom Left</option><option value="10">Middle Left</option><option value="11">Top Left</option><option value="12">Top Corner Left</option><option value="12">Above Left</option><option value="14">Above Middle</option><option value="15">Above Right</option><option value="16">Top Right Corner</option></select><br><i>Recommended and Default position:Top Right</i></div><hr/><div class="item-metadata"></div><div class="drs-items"></div><ol id="sortable-item-list"></ol><div class="drs-pagination"></div></div>');
     get_updated_items(search_params, 'item');
   }
   if (id == 2){
     $("#TB_ajaxContent #tabs-2").html('<h4>Gallery Slider</h4><br/><label for="search">Search for an item: </label><input type="text" name="search" id="search-gallery" /><button class="themebutton" id="search-button-gallery">Search</button><br/><button class="gallery-options button"><span class="dashicons dashicons-admin-generic"></span></button><div class="hidden gallery-options"><label for="drstk-slider-auto"><input type="checkbox" name="drstk-slider-auto" id="drstk-slider-auto" value="yes" checked="checked" />Auto rotate</label><br/><label for="drstk-slider-nav"><input type="checkbox" name="drstk-slider-nav" id="drstk-slider-nav" value="yes" checked="checked" />Next/Prev Buttons</label><br/><label for="drstk-slider-pager"><input type="checkbox" name="drstk-slider-pager" id="drstk-slider-pager" value="yes" checked="checked" />Dot Pager</label><br/><label for="drstk-slider-speed">Rotation Speed<input type="text" name="drstk-slider-speed" id="drstk-slider-speed" />(Speed is in milliseconds. 5000 milliseconds = 5 seconds)</label><br/><label for="drstk-slider-max-height">Max Height<input type="number" name="drstk-slider-max-height" id="drstk-slider-max-height" /></label><br/><label for="drstk-slider-max-width">Max Width<input type="text" name="drstk-slider-max-width" id="drstk-slider-max-width" /></label><br/><label for="drstk-slider-image-size">Image Size<select name="drstk-slider-image-size" id="drstk-slider-image-size"><option value="1">Largest side is 85px</option><option value="2">Largest side is 170px</option><option value="3">Largest side is 340px</option><option value="4" selected="selected">Largest side is 500px</option><option value="5">Largest side is 1000px</option></select></label><br/><label for="drstk-slider-caption"><input type="checkbox" name="drstk-slider-caption" id="drstk-slider-caption" value="yes" checked="checked"/>Enable captions</label><br/><div class="drstk-slider-metadata"><label for="drstk-slider-caption-align">Caption Alignment<select name="drstk-slider-caption-align" id="drstk-slider-caption-align"><option value="left">Left</option><option value="right">Right</option><option value="center" selected="selected">Center</option></select></label><br/><label for="drstk-slider-caption-position">Caption Position<select name="drstk-slider-caption-position" id="drstk-slider-caption-position"><option value="absolute">Over Image</option><option value="relative">Below Image</option></select></label><br/><h5>Metadata for Captions</h5><label><input type="checkbox" name="Title" checked="checked"/>Title</label><br/><label><input type="checkbox" name="Creator,Contributor" checked="checked"/>Creator</label><br/><label><input type="checkbox" name="Date created"/>Date Created</label><br/><label><input type="checkbox" name="Abstract/Description"/>Abstract/Description</label></div></div><div class="drs-items"></div><ol id="sortable-gallery-list"></ol><div class="drs-pagination"></div><input type="hidden" class="selected-gallery" />');
     get_updated_items(search_params, 'gallery');
   }
 });

 //click the main add drs button
 $("body").on('click', "#insert-drs",  function(){
  //  $("#TB_ajaxContent #tabs-1 .drs-items").html("Loading...");
   get_updated_items(search_params, 'tile');
 });

   //when an item is selected
  $("body").on("change", "[class^='drstk-include-']", function(e){
    var pid = $(this).val();
    var type = $(this).attr("class").split("-")[2];
    if (type == 'item'){
      if($(this).is(":checked")){
        $(this).parents("li").siblings("li").hide();
        $(".item-metadata").siblings(".drs-pagination").hide();
        $.post(item_admin_obj.ajax_url, {
           _ajax_nonce: item_admin_obj.item_admin_nonce,
            action: "get_item_admin",
            pid: pid,
        }, function(data) {
            var data = $.parseJSON(data);
            if (data.error){
              $(".item-metadata").html("There was an error: "+data.error);
            } else {
              var data_html = '';
              $.each(data.mods, function(key,value){
                data_html += "<div><input type='checkbox' name='"+key+"' value='"+value+"'/><b>"+key+"</b></div><div>";
                  data_html += value;
                data_html += "</div>";
              });
              $(".item-metadata").html(data_html);
            }
        }).fail(function() {
          $(".item-metadata").html("There was an error getting metadata on this item. Please try a different url.");
        });
      } else {
        $(this).parents("li").siblings("li").show();
        $(".item-metadata").siblings(".drs-pagination").show();
        $(".item-metadata").html("");
      }
    }
    if(type == 'gallery' || type == 'tile' || type == 'video'){
      var selected = $(".selected-"+type).val();
      if ( selected == ''){
        $(".selected-"+type).val(pid);
      } else {
        $(".selected-"+type).val(selected + ", " + pid);
      }
    }
  });

  //enables the search button
   $("body").on("click", "button[id^=search-button-]", function(){
     var id = jQuery(this).attr('id');
     id = id.split('-')[2];
     search_params.q = $("#TB_ajaxContent #search-"+id).val();
     get_updated_items(search_params, id);
   });

   //enables the pagination
   $("body").on("click", ".tablenav-pages a", function(){
     val = $(this).html();
     if (val == '&lt;&lt;'){
       val = 1
     }
     if (val == '&gt;&gt;'){
       val = $(this).data('val');
     }
     if ($.isNumeric(val)){
       search_params.page = val;
       var type = $(this).parents(".drs-pagination").siblings(".themebutton").attr('id').split('-')[2]
       get_updated_items(search_params, type);
     }
   });

   function get_updated_items(search_params, name){
     var tile_html = '';
     var tab = 0;
     if(name == 'tile'){ tab = 1}
     if(name == 'gallery'){ tab = 2}
     if(name == 'item'){ tab = 3}
     if(name == 'video'){ tab = 4}
     $("#TB_ajaxContent #tabs-"+tab+" .drs-items").html("Loading...");
     $.post(tile_ajax_obj.ajax_url, {
        _ajax_nonce: tile_ajax_obj.tile_ajax_nonce,
         action: "get_tile_code",
         params: search_params,
     }, function(data) {
        var data = $.parseJSON(data);
        if (data.response.response.numFound > 0){
          $("#sortable-"+name+"-list").children("li").remove();
          var media_count = 0;
          $.each(data.response.response.docs, function(id, item){
            if (item.active_fedora_model_ssi == 'CoreFile'){
              if (tab == 4){
                if (item.canonical_class_tesim == 'AudioFile' || item.canonical_class_tesim == 'VideoFile'){
                  $("#sortable-"+name+"-list").append('<li style="display:inline-block;padding:10px;"><label for="drstile-' + id + '"><img src="https://repository.library.northeastern.edu' + item.thumbnail_list_tesim[0] + '" width="150" /><br/><input id="drstile-' + id + '" type="checkbox" class="drstk-include-'+name+'" value="' + item.id + '" /><span style="width:100px;display:inline-block">' + item.full_title_ssi + '</span></label></li>');
                  media_count++;
                  data.pagination.table.num_pages = Math.ceil(media_count / 10);
                }
              } else {
                $("#sortable-"+name+"-list").append('<li style="display:inline-block;padding:10px;"><label for="drstile-' + id + '"><img src="https://repository.library.northeastern.edu' + item.thumbnail_list_tesim[0] + '" width="150" /><br/><input id="drstile-' + id + '" type="checkbox" class="drstk-include-'+name+'" value="' + item.id + '" /><span style="width:100px;display:inline-block">' + item.full_title_ssi + '</span></label></li>');
              }
            }
          });
          update_pagination(tab, data);
        } else {
          $("#TB_ajaxContent #tabs-"+tab+" .drs-items").html("No results were retrieved for your query. Please try a different query.");
        }
        $("#TB_ajaxContent #tabs-"+tab+" .drs-items").html('<a href="#" id="drstk_insert_'+name+'" class="button" title="Insert shortcode">Insert shortcode</a><p>Drag and drop the thumbnails in the order you want them to appear in the playlist. You can un-check the images you wish to exclude entirely.</p>');

      });
      $("#sortable-"+name+"-list").sortable();
   }

   function update_pagination(tab, data){
     if (data.pagination.table.num_pages > 1){
         var pagination = "";
         if (data.pagination.table.current_page > 1){
           pagination += "<a href='#' class='prev-page'><<</a>";
         } else {
           pagination += "<a href='#' class='prev-page disabled'><<</a>";
         }
         for (var i = 1; i <= data.pagination.table.num_pages; i++) {
           if (data.pagination.table.current_page == i){
             var pagination_class = 'current-page disabled';
           } else {
             var pagination_class = '';
           }
             pagination += "<a href='#' class='"+pagination_class+"'>" + i + "</a>";
         }
         if (data.pagination.table.current_page == data.pagination.table.num_pages){
           pagination += "<a href='#' class='next-page' data-val='"+data.pagination.table.num_pages+"'>>></a>";
         } else {
           pagination += "<a href='#' class='next-page disabled' data-val='"+data.pagination.table.num_pages+"'>>></a>";
         }
         $("#TB_ajaxContent #tabs-"+tab+" .drs-pagination").html("<span class='tablenav'><span class='tablenav-pages'>" + pagination + "</span></span>");
     }
   }

   //inserting the shortcodes
   $("body").on("click", "[id^=drstk_insert_]", function(e){
     e.preventDefault();
     var type = $(this).attr("id").split("_")[2];
     var shortcode = '';
     if(type == 'gallery'){
      var slides = $(".selected-"+type).val();
       shortcode = '[drstk_gallery id="'+slides+'"';
       if ($("#drstk-slider-caption").is(":checked")){
         shortcode += ' caption="on"';
       }
       shortcode += ' caption-align="'+$("#drstk-slider-caption-align").val()+'"';
       shortcode += ' caption-position="'+$("#drstk-slider-caption-position").val()+'"';
       if ($("#drstk-slider-auto").is(":checked")){
         shortcode += ' auto="on"';
       }
       if ($("#drstk-slider-nav").is(":checked")){
         shortcode += ' nav="on"';
       }
       if ($("#drstk-slider-speed").val()){
         shortcode += ' speed="'+$("#drstk-slider-speed").val()+'"';
       }
       if ($("#drstk-slider-max-height").val() > 0){
         shortcode += ' max-height="'+$("#drstk-slider-max-height").val()+'"';
       }
       if ($("#drstk-slider-max-width").val() > 0){
         shortcode += ' max-width="'+$("#drstk-slider-max-width").val()+'"';
       }
       if ($("#drstk-slider-image-size").val() > 0){
         shortcode += ' image-size="'+$("#drstk-slider-image-size").val()+'"';
       }
       var metadata = [];
       $(this).parent(".drs-items").siblings("div.gallery-options").find(".drstk-slider-metadata input[type='checkbox']:checked").each(function(){
         metadata.push($(this).attr('name'));
       });
       if (metadata.length > 0) {shortcode += ' metadata="'+metadata+'"';}
       shortcode += ']\n';
     }
     if(type == 'tile'){
       var tiles = $(".selected-"+type).val();
       shortcode = '[drstk_tiles id="'+tiles+'"';
       shortcode += ' type="'+$("#TB_ajaxContent #drstk-tile-type").val()+'"';
       var metadata = [];
       $(this).parent(".drs-items").siblings("div.tile-options").find(".drstk-tile-metadata input[type='checkbox']:checked").each(function(){
         metadata.push($(this).attr('name'));
       });
       if (metadata.length > 0) {shortcode += ' metadata="'+metadata+'"';}
       var cell_width = $(this).parent(".drs-items").siblings("div.tile-options").find("input[name='cell-width']").val();
       if ($.isNumeric(cell_width)){
         shortcode += ' cell-width="'+cell_width+'"';
       }
       var cell_height = $(this).parent(".drs-items").siblings("div.tile-options").find("input[name='cell-height']").val();
       if ($.isNumeric(cell_height)){
         shortcode += ' cell-height="'+cell_height+'"';
       }
       if ($("#drstk-tile-image-size").val() > 0){
         shortcode += ' image-size="'+$("#drstk-tile-image-size").val()+'"';
       }
       shortcode += ' text-align="'+$("#TB_ajaxContent #drstk-tile-caption-align").val()+'"';
       shortcode += ']\n';
     }
     if(type == 'item'){
       var pid = '';
       $(".drstk-include-item").each(function(){
         if ($(this).is(":visible")){
           pid = $(this).val();
         }
       });
       var metadata = [];
       $(this).parent(".drs-items").siblings("div.item-metadata").find("input[type='checkbox']:checked").each(function(){
         metadata.push($(this).attr('name'));
       });
       shortcode = '[drstk_item id="'+pid+'"';
       if ($("#drstk-item-zoom").is(":checked")){
         shortcode += ' zoom="on"';
       }
       if ($("#drstk-item-zoom-inner").is(":checked") && $("#drstk-item-zoom-window").val() == 0){
         shortcode += ' zoom_position="inner"';
       }
       if ($("#drstk-item-zoom-window").val() > 0){
         shortcode += ' zoom_position="'+$("#drstk-item-zoom-window").val()+'"';
       }
       shortcode += ' align="'+$("#drstk-item-align").val()+'"';
       shortcode += ' caption-align="'+$("#drstk-item-caption-align").val()+'"';
       if ($("#drstk-item-image-size").val() > 0){
         shortcode += ' image-size="'+$("#drstk-item-image-size").val()+'"';
       }
       if (metadata.length > 0) {shortcode += ' metadata="'+metadata+'"';}
       shortcode +=']\n';
     }
     if(type == 'video'){
        var videos = $(".selected-"+type).val();
        shortcode = '[drstk_collection_playlist id="'+videos+'"';
        var width = $(this).parent(".drs-items").siblings("div.video-options").find("input[name='drstk-video-width']").val();
        shortcode += ' width="'+width+'"';
        var height = $(this).parent(".drs-items").siblings("div.video-options").find("input[name='drstk-video-height']").val();
        shortcode += ' height="'+height+'"';
        shortcode += ']\n';
     }
    window.wp.media.editor.insert(shortcode);
   })

   //enables settings toggle
   $("body").on("click", "button[class*='-options']", function(e){
     e.preventDefault();
     var type = $(this).attr("class").split("-")[0];
     $("div."+type+"-options").toggleClass('hidden');
   });

});
