(function($) {

    $.fn.gallery = function(params) {

        var _gallery = this;

        var _ratio_width = .75;

        var _total_cnt = 0;
        var _current = 1;
        var _total_height = _total_width = $(this).width();
        var _list_item_height = 100;

        var _list = $('.gallery-item', this);

        var _org_width = $('img', $(_list[0])).width();
        var _org_height = $('img', $(_list[0])).height();


        $(_gallery).empty();

        var _viewer_width = Math.round(_total_height * .75);


        _total_cnt = _list.length;

        //list.css('display', 'none');
        $(this).append('<div class="__gallery-main"><div class="__gallery-viewer"></div><div class="__gallery-list-wrapper"><div class="__gallery-list"></div></div></div>')
        var _gallery_main = $('.__gallery-main');
        var _gallery_viewer = $('.__gallery-viewer');
        var _gallery_list_wrapper = $('.__gallery-list-wrapper');
        var _gallery_list = $('.__gallery-list');
        //var _gallery_item_title = $('.__item-title');

        $(_gallery_viewer).width($(_gallery).width() * _ratio_width);
        $(_gallery_viewer).height(Math.round(_org_height * $(_gallery_viewer).width() / _org_width));

        $(_gallery_list_wrapper).width($(_gallery).width() * (1 - _ratio_width));

        //$(_gallery_list_wrapper).height(_viewer_height);
        _list_item_height = Math.round($(_gallery_viewer).height() / 3)


        //$(this).css('height', $(_gallery_viewer).height() + 50); //Title을 출력하기 위해


        $.each($(_list), function(idx, item){
            console.log($(item).data('title'));
            $(this).addClass('__gallery-item');
            $(this).addClass('__gallery-item-' + (idx + 1));

            if( idx == 0){
                $(_gallery_viewer).append($(this));
                //$(_gallery_item_title).html($(this).data('title'));
            }else{
                $(_gallery_list).append($(this));
            }
        });

        $(_gallery_list_wrapper).css('height', $(_gallery_viewer).height());


        if( params['slide'] == true )
            setInterval(function(){ slide(); }, 3000);


        function test(){


        }

        function slide(){
            _current++;

            var tmp = _current;

            var item1 = $('.gallery-item:nth(0)').clone();
            var item2 = $('.gallery-item:nth(1)').clone();

            //$(_gallery_item_title).html($(item2).data('title'));
            $(_gallery_viewer).empty();
            $(_gallery_viewer).append(item2);
            $(_gallery_list).append(item1);
            $(item2).css('display', 'none');
            $(item2).fadeIn(1000);

            $(_gallery_list).animate({
                top: "-=" + _list_item_height
            }, 1000, function() {
                $(_gallery_list).children().first().remove();
                $(_gallery_list).css('top', '+='+_list_item_height);
            });



        }


        // For chaining
        return this;
    };

})(jQuery);